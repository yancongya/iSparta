<template>
  <div class="header-container">
    <div class="logo">
      <img src="../assets/logo.svg" alt="iSparta Logo" class="logo-image" />
      <span class="logo-text">iSparta Web</span>
    </div>
    <div class="nav-menu">
      <el-menu
        mode="horizontal"
        :ellipsis="false"
        background-color="#409EFF"
        text-color="#fff"
        active-text-color="#ffd04b"
        :default-active="activeIndex"
        @select="handleSelect"
      >
        <el-menu-item index="convert">{{ $t('nav.convert') }}</el-menu-item>
        <el-menu-item index="about">{{ $t('nav.about') }}</el-menu-item>
        <el-sub-menu index="language">
          <template #title>{{ $t('nav.language') }}</template>
          <el-menu-item index="zh-cn" @click="changeLanguage('zh-cn')">简体中文</el-menu-item>
          <el-menu-item index="zh-tw" @click="changeLanguage('zh-tw')">繁體中文</el-menu-item>
          <el-menu-item index="en-us" @click="changeLanguage('en-us')">English</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { locale } = useI18n()

// 当前活动菜单项
const activeIndex = ref('convert')

// 处理菜单选择
const handleSelect = (key) => {
  if (key === 'convert' || key === 'about') {
    router.push({ name: key })
  }
}

// 切换语言
const changeLanguage = (lang) => {
  locale.value = lang
  // 保存语言设置到本地存储
  localStorage.setItem('isparta-language', lang)
}

// 初始化语言设置
const initLanguage = () => {
  const savedLanguage = localStorage.getItem('isparta-language')
  if (savedLanguage) {
    locale.value = savedLanguage
  }
}

// 组件挂载时初始化语言
initLanguage()
</script>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-image {
  height: 40px;
  margin-right: 10px;
}

.logo-text {
  font-size: 20px;
  font-weight: bold;
  color: white;
}

.nav-menu {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

:deep(.el-menu) {
  border-bottom: none;
  background-color: transparent !important;
}

:deep(.el-menu--horizontal > .el-menu-item) {
  height: 60px;
  line-height: 60px;
  border-bottom: none;
}

:deep(.el-menu--horizontal > .el-sub-menu) {
  height: 60px;
  line-height: 60px;
  border-bottom: none;
}

:deep(.el-menu--horizontal > .el-sub-menu .el-sub-menu__title) {
  height: 60px;
  line-height: 60px;
  border-bottom: none;
}
</style>