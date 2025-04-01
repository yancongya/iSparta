<template>
  <div class="convert-container">
    <el-row :gutter="20">
      <el-col :span="16">
        <!-- 上传区域 -->
        <el-card class="upload-area" v-if="fileList.length === 0">
          <div class="upload-content" @dragover.prevent @drop.prevent="handleDrop">
            <el-upload
              class="upload-dragger"
              drag
              action="#"
              :auto-upload="false"
              :on-change="handleFileChange"
              :multiple="true"
              :file-list="fileList"
            >
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">
                {{ $t('convert.dropFilesHere') }}
                <em>{{ $t('convert.clickToUpload') }}</em>
              </div>
              <template #tip>
                <div class="el-upload__tip">
                  {{ $t('convert.supportedFormats') }}
                </div>
              </template>
            </el-upload>
          </div>
        </el-card>

        <!-- 文件列表 -->
        <el-card v-else>
          <template #header>
            <div class="card-header">
              <span>{{ $t('convert.fileList') }}</span>
              <el-button type="primary" @click="startConversion" :loading="converting">
                {{ $t('convert.startConversion') }}
              </el-button>
            </div>
          </template>
          <el-table :data="fileList" style="width: 100%">
            <el-table-column prop="name" :label="$t('convert.fileName')" width="180">
              <template #default="scope">
                <div class="file-name">
                  <el-icon><document /></el-icon>
                  <span>{{ scope.row.name }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="size" :label="$t('convert.fileSize')" width="120">
              <template #default="scope">
                {{ formatFileSize(scope.row.size) }}
              </template>
            </el-table-column>
            <el-table-column prop="type" :label="$t('convert.fileType')" width="120">
              <template #default="scope">
                {{ getFileType(scope.row) }}
              </template>
            </el-table-column>
            <el-table-column :label="$t('convert.actions')">
              <template #default="scope">
                <el-button type="danger" size="small" @click="removeFile(scope.$index)">
                  {{ $t('convert.remove') }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="clear-files">
            <el-button type="info" @click="clearFiles">
              {{ $t('convert.clearAll') }}
            </el-button>
          </div>
        </el-card>

        <!-- 转换结果 -->
        <el-card v-if="conversionResults.length > 0" class="result-card">
          <template #header>
            <div class="card-header">
              <span>{{ $t('convert.conversionResults') }}</span>
              <el-button type="success" @click="downloadAll">
                {{ $t('convert.downloadAll') }}
              </el-button>
            </div>
          </template>
          <el-table :data="conversionResults" style="width: 100%">
            <el-table-column prop="originalName" :label="$t('convert.originalFile')" width="180"></el-table-column>
            <el-table-column prop="convertedName" :label="$t('convert.convertedFile')" width="180"></el-table-column>
            <el-table-column prop="format" :label="$t('convert.format')" width="100"></el-table-column>
            <el-table-column :label="$t('convert.actions')">
              <template #default="scope">
                <el-button type="primary" size="small" @click="downloadFile(scope.row)">
                  {{ $t('convert.download') }}
                </el-button>
                <el-button type="info" size="small" @click="previewFile(scope.row)">
                  {{ $t('convert.preview') }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>

      <el-col :span="8">
        <!-- 设置面板 -->
        <el-card class="settings-panel">
          <template #header>
            <div class="card-header">
              <span>{{ $t('convert.conversionSettings') }}</span>
            </div>
          </template>
          
          <!-- 输出格式 -->
          <div class="setting-item">
            <h3>{{ $t('settings.outputFormat') }}</h3>
            <el-checkbox-group v-model="settings.outputFormat">
              <el-checkbox label="APNG">APNG</el-checkbox>
              <el-checkbox label="GIF">GIF</el-checkbox>
              <el-checkbox label="WEBP">WEBP</el-checkbox>
            </el-checkbox-group>
          </div>
          
          <!-- 帧率设置 -->
          <div class="setting-item">
            <h3>{{ $t('settings.frameRate') }}</h3>
            <el-slider v-model="settings.frameRate" :min="1" :max="60" :step="1" show-input></el-slider>
          </div>
          
          <!-- 循环次数 -->
          <div class="setting-item">
            <h3>{{ $t('settings.loopCount') }}</h3>
            <el-input-number v-model="settings.loop" :min="0" :max="100" :step="1"></el-input-number>
            <div class="setting-description">
              {{ $t('settings.loopDescription') }}
            </div>
          </div>
          
          <!-- 质量设置 -->
          <div class="setting-item">
            <h3>{{ $t('settings.quality') }}</h3>
            <el-checkbox v-model="settings.quality.checked">{{ $t('settings.enableQuality') }}</el-checkbox>
            <el-slider 
              v-if="settings.quality.checked" 
              v-model="settings.quality.value" 
              :min="1" 
              :max="100" 
              :step="1" 
              show-input
            ></el-slider>
          </div>
          
          <!-- 抖动设置 -->
          <div class="setting-item">
            <h3>{{ $t('settings.floyd') }}</h3>
            <el-checkbox v-model="settings.floyd.checked">{{ $t('settings.enableFloyd') }}</el-checkbox>
            <el-slider 
              v-if="settings.floyd.checked" 
              v-model="settings.floyd.value" 
              :min="0" 
              :max="1" 
              :step="0.01" 
              show-input
            ></el-slider>
          </div>
          
          <!-- 输出名称 -->
          <div class="setting-item">
            <h3>{{ $t('settings.outputName') }}</h3>
            <el-input v-model="settings.outputName" :placeholder="$t('settings.outputNamePlaceholder')"></el-input>
          </div>
          
          <!-- 输出后缀 -->
          <div class="setting-item">
            <h3>{{ $t('settings.outputSuffix') }}</h3>
            <el-input v-model="settings.outputSuffix" :placeholder="$t('settings.outputSuffixPlaceholder')"></el-input>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 预览对话框 -->
    <el-dialog v-model="previewDialogVisible" :title="$t('convert.filePreview')" width="50%">
      <div class="preview-container" v-if="previewFile">
        <img v-if="isImagePreviewable" :src="previewUrl" alt="Preview" class="preview-image">
        <div v-else class="preview-not-available">
          {{ $t('convert.previewNotAvailable') }}
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { UploadFilled, Document } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 文件列表
const fileList = ref([])

// 转换状态
const converting = ref(false)

// 转换结果
const conversionResults = ref([])

// 预览对话框
const previewDialogVisible = ref(false)
const previewFile = ref(null)
const previewUrl = ref('')
const isImagePreviewable = ref(false)

// 转换设置
const settings = reactive({
  outputFormat: ['APNG'],
  frameRate: 20,
  loop: 0,
  outputName: '',
  outputSuffix: 'iSpt',
  quality: {
    checked: false,
    value: 80
  },
  floyd: {
    checked: true,
    value: 0.35
  }
})

// 处理文件拖放
const handleDrop = (e) => {
  e.preventDefault()
  const files = e.dataTransfer.files
  if (files.length > 0) {
    handleFiles(files)
  }
}

// 处理文件选择
const handleFileChange = (file) => {
  fileList.value.push(file.raw)
}

// 处理文件
const handleFiles = (files) => {
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    // 检查文件类型
    if (isValidFileType(file)) {
      fileList.value.push(file)
    } else {
      ElMessage.warning(t('convert.unsupportedFileType'))
    }
  }
}

// 检查文件类型是否有效
const isValidFileType = (file) => {
  const validTypes = ['image/png', 'image/gif', 'image/webp']
  return validTypes.includes(file.type)
}

// 获取文件类型
const getFileType = (file) => {
  if (file.type === 'image/png') return 'PNG'
  if (file.type === 'image/gif') return 'GIF'
  if (file.type === 'image/webp') return 'WEBP'
  return file.type
}

// 格式化文件大小
const formatFileSize = (size) => {
  if (size < 1024) {
    return size + ' B'
  } else if (size < 1024 * 1024) {
    return (size / 1024).toFixed(2) + ' KB'
  } else {
    return (size / (1024 * 1024)).toFixed(2) + ' MB'
  }
}

// 移除文件
const removeFile = (index) => {
  fileList.value.splice(index, 1)
}

// 清空文件列表
const clearFiles = () => {
  ElMessageBox.confirm(
    t('convert.clearConfirmation'),
    t('convert.warning'),
    {
      confirmButtonText: t('convert.confirm'),
      cancelButtonText: t('convert.cancel'),
      type: 'warning',
    }
  ).then(() => {
    fileList.value = []
    ElMessage.success(t('convert.filesCleared'))
  }).catch(() => {})
}

// 开始转换
const startConversion = () => {
  if (fileList.value.length === 0) {
    ElMessage.warning(t('convert.noFilesSelected'))
    return
  }
  
  if (settings.outputFormat.length === 0) {
    ElMessage.warning(t('convert.noOutputFormatSelected'))
    return
  }
  
  converting.value = true
  
  // 模拟转换过程
  setTimeout(() => {
    // 在实际应用中，这里应该调用后端API进行转换
    // 这里只是模拟转换结果
    const results = fileList.value.map(file => {
      const results = []
      
      settings.outputFormat.forEach(format => {
        const originalName = file.name
        const baseName = originalName.substring(0, originalName.lastIndexOf('.'))
        const outputName = settings.outputName || baseName
        const suffix = settings.outputSuffix ? `-${settings.outputSuffix}` : ''
        const convertedName = `${outputName}${suffix}.${format.toLowerCase()}`
        
        results.push({
          originalName,
          convertedName,
          format,
          url: '#', // 在实际应用中，这应该是文件的下载URL
          previewUrl: '#' // 在实际应用中，这应该是文件的预览URL
        })
      })
      
      return results
    }).flat()
    
    conversionResults.value = results
    converting.value = false
    ElMessage.success(t('convert.conversionComplete'))
  }, 2000)
}

// 下载文件
const downloadFile = (file) => {
  // 在实际应用中，这里应该触发文件下载
  ElMessage.info(t('convert.downloadStarted', { file: file.convertedName }))
}

// 下载所有文件
const downloadAll = () => {
  // 在实际应用中，这里应该触发所有文件的下载
  ElMessage.info(t('convert.downloadAllStarted'))
}

// 预