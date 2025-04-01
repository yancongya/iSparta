<template>
  <div class="about-container">
    <el-card class="about-card">
      <template #header>
        <div class="card-header">
          <h1>{{ $t('about.title') }}</h1>
        </div>
      </template>
      
      <div class="about-content">
        <div class="about-section">
          <h2>{{ $t('about.introduction') }}</h2>
          <p>{{ $t('about.introText') }}</p>
          
          <div class="screenshot">
            <img src="https://raw.githubusercontent.com/iSparta/iSparta/master/public/screenshot/iSparta3.1.png" alt="iSparta Screenshot" />
          </div>
        </div>
        
        <div class="about-section">
          <h2>{{ $t('about.features') }}</h2>
          <ul class="feature-list">
            <li>
              <el-icon><Picture /></el-icon>
              <div class="feature-text">
                <h3>{{ $t('about.feature1Title') }}</h3>
                <p>{{ $t('about.feature1Text') }}</p>
              </div>
            </li>
            <li>
              <el-icon><Timer /></el-icon>
              <div class="feature-text">
                <h3>{{ $t('about.feature2Title') }}</h3>
                <p>{{ $t('about.feature2Text') }}</p>
              </div>
            </li>
            <li>
              <el-icon><PictureFilled /></el-icon>
              <div class="feature-text">
                <h3>{{ $t('about.feature3Title') }}</h3>
                <p>{{ $t('about.feature3Text') }}</p>
              </div>
            </li>
            <li>
              <el-icon><VideoPlay /></el-icon>
              <div class="feature-text">
                <h3>{{ $t('about.feature4Title') }}</h3>
                <p>{{ $t('about.feature4Text') }}</p>
              </div>
            </li>
            <li>
              <el-icon><Compress /></el-icon>
              <div class="feature-text">
                <h3>{{ $t('about.feature5Title') }}</h3>
                <p>{{ $t('about.feature5Text') }}</p>
              </div>
            </li>
          </ul>
        </div>
        
        <div class="about-section">
          <h2>{{ $t('about.webVersion') }}</h2>
          <p>{{ $t('about.webVersionText') }}</p>
          
          <div class="advantages">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-card shadow="hover" class="advantage-card">
                  <el-icon size="32" color="#409EFF"><Connection /></el-icon>
                  <h3>{{ $t('about.advantage1Title') }}</h3>
                  <p>{{ $t('about.advantage1Text') }}</p>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover" class="advantage-card">
                  <el-icon size="32" color="#409EFF"><Monitor /></el-icon>
                  <h3>{{ $t('about.advantage2Title') }}</h3>
                  <p>{{ $t('about.advantage2Text') }}</p>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover" class="advantage-card">
                  <el-icon size="32" color="#409EFF"><Share /></el-icon>
                  <h3>{{ $t('about.advantage3Title') }}</h3>
                  <p>{{ $t('about.advantage3Text') }}</p>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </div>
        
        <div class="about-section">
          <h2>{{ $t('about.authors') }}</h2>
          <ul class="authors-list">
            <li><a href="https://github.com/jeakey" target="_blank">jeakey</a></li>
            <li><a href="https://github.com/ccJUN" target="_blank">ccJUN</a></li>
            <li><a href="https://github.com/yikfun" target="_blank">yikfun</a></li>
          </ul>
          
          <h2>{{ $t('about.contributors') }}</h2>
          <ul class="contributors-list">
            <li><a href="https://github.com/dreampiggy" target="_blank">DreamPiggy</a></li>
          </ul>
        </div>
        
        <div class="about-section">
          <h2>{{ $t('about.acknowledgements') }}</h2>
          <ul class="acknowledgements-list">
            <li><a href="http://apngasm.sourceforge.net/" target="_blank">apngasm</a></li>
            <li><a href="https://sourceforge.net/projects/apng/files/APNG_Optimizer/" target="_blank">apngopt</a></li>
            <li><a href="https://github.com/Benny-/apng2webp" target="_blank">apng2webp</a></li>
            <li><a href="http://advsys.net/ken/utils.htm" target="_blank">pngout</a></li>
            <li><a href="https://pngquant.org/" target="_blank">pngquant</a></li>
            <li><a href="https://developers.google.com/speed/webp/" target="_blank">webp</a></li>
          </ul>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { Picture, Timer, PictureFilled, VideoPlay, Compress, Connection, Monitor, Share } from '@element-plus/icons-vue'
</script>

<style scoped>
.about-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.about-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h1 {
  margin: 0;
  font-size: 24px;
  color: #303133;
}

.about-content {
  color: #606266;
}

.about-section {
  margin-bottom: 30px;
}

.about-section h2 {
  font-size: 20px;
  color: #303133;
  margin-top: 0;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ebeef5;
}

.screenshot {
  margin: 20px 0;
  text-align: center;
}

.screenshot img {
  max-width: 100%;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  display: flex;
  margin-bottom: 20px;
  align-items: flex-start;
}

.feature-list .el-icon {
  font-size: 24px;
  color: #409EFF;
  margin-right: 15px;
  margin-top: 3px;
}

.feature-text h3 {
  margin-top: 0;
  margin-bottom: 5px;
  font-size: 16px;
  color: #303133;
}

.feature-text p {
  margin: 0;
  color: #606266;
}

.advantages {
  margin-top: 20px;
}

.advantage-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
}

.advantage-card h3 {
  margin: 15px 0 10px;
  font-size: 16px;
  color: #303133;
}

.advantage-card p {
  margin: 0;
  color: #606266;
  font-size: 14px;
}

.authors-list,
.contributors-list,
.acknowledgements-list {
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
  display: flex;
  flex-wrap: wrap;
}

.authors-list li,
.contributors-list li,
.acknowledgements-list li {
  margin-right: 15px;
  margin-bottom: 10px;
}

.authors-list a,
.contributors-list a,
.acknowledgements-list a {
  color: #409EFF;
  text-decoration: none;
}

.authors-list a:hover,
.contributors-list a:hover,
.acknowledgements-list a:hover {
  text-decoration: underline;
}
</style>