import { defineStore } from 'pinia'

// 定义设置存储
export const useSettingsStore = defineStore('settings', {
  state: () => ({
    // 全局设置
    globalSettings: {
      language: 'zh-cn',
      theme: 'light'
    },
    // 转换设置
    convertSettings: {
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
    }
  }),
  
  actions: {
    // 更新全局设置
    updateGlobalSettings(settings) {
      this.globalSettings = { ...this.globalSettings, ...settings }
      // 保存到本地存储
      localStorage.setItem('isparta-global-settings', JSON.stringify(this.globalSettings))
    },
    
    // 更新转换设置
    updateConvertSettings(settings) {
      this.convertSettings = { ...this.convertSettings, ...settings }
      // 保存到本地存储
      localStorage.setItem('isparta-convert-settings', JSON.stringify(this.convertSettings))
    },
    
    // 初始化设置（从本地存储加载）
    initSettings() {
      const globalSettings = localStorage.getItem('isparta-global-settings')
      const convertSettings = localStorage.getItem('isparta-convert-settings')
      
      if (globalSettings) {
        this.globalSettings = JSON.parse(globalSettings)
      }
      
      if (convertSettings) {
        this.convertSettings = JSON.parse(convertSettings)
      }
    }
  }
})

// 定义文件存储
export const useFilesStore = defineStore('files', {
  state: () => ({
    // 文件列表
    fileList: [],
    // 转换结果
    conversionResults: [],
    // 转换状态
    converting: false
  }),
  
  actions: {
    // 添加文件
    addFiles(files) {
      this.fileList = [...this.fileList, ...files]
    },
    
    // 移除文件
    removeFile(index) {
      this.fileList.splice(index, 1)
    },
    
    // 清空文件列表
    clearFiles() {
      this.fileList = []
    },
    
    // 设置转换状态
    setConverting(status) {
      this.converting = status
    },
    
    // 添加转换结果
    addConversionResults(results) {
      this.conversionResults = [...this.conversionResults, ...results]
    },
    
    // 清空转换结果
    clearConversionResults() {
      this.conversionResults = []
    }
  }
})