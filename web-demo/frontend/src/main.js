import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'normalize.css/normalize.css'
import { createI18n } from 'vue-i18n'
import zhCN from './locales/zh-cn'
import zhTW from './locales/zh-tw'
import enUS from './locales/en-us'

// 创建i18n实例
const i18n = createI18n({
  legacy: false, // 使用Composition API模式
  locale: 'zh-cn', // 默认语言
  messages: {
    'zh-cn': zhCN,
    'zh-tw': zhTW,
    'en-us': enUS
  }
})

// 创建pinia实例
const pinia = createPinia()

// 创建应用实例
const app = createApp(App)

// 使用插件
app.use(router)
app.use(pinia)
app.use(ElementPlus)
app.use(i18n)

// 挂载应用
app.mount('#app')