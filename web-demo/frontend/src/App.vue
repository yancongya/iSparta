<template>
  <div id="app">
    <el-config-provider :locale="locale">
      <el-container>
        <el-header height="60px">
          <header-component />
        </el-header>
        <el-main>
          <router-view />
        </el-main>
        <el-footer height="40px">
          <footer-component />
        </el-footer>
      </el-container>
    </el-config-provider>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import enUs from 'element-plus/lib/locale/lang/en'
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'

const { locale } = useI18n()

// Element Plus 国际化
const elementLocale = computed(() => {
  if (locale.value === 'zh-cn' || locale.value === 'zh-tw') {
    return zhCn
  }
  return enUs
})
</script>

<style>
body {
  margin: 0;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.el-header {
  background-color: #409EFF;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 20px;
}

.el-main {
  flex: 1;
  padding: 0;
  overflow-x: hidden;
}

.el-footer {
  background-color: #f5f7fa;
  color: #909399;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}
</style>