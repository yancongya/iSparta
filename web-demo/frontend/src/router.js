import { createRouter, createWebHistory } from 'vue-router'
import ConvertPage from './views/ConvertPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/convert'
  },
  {
    path: '/convert',
    name: 'convert',
    component: ConvertPage,
    meta: {
      title: 'iSparta Web - 图片转换工具'
    }
  },
  {
    path: '/about',
    name: 'about',
    // 路由懒加载
    component: () => import('./views/AboutPage.vue'),
    meta: {
      title: 'iSparta Web - 关于'
    }
  },
  {
    // 404页面
    path: '/:pathMatch(.*)*',
    redirect: '/convert'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由标题
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'iSparta Web'
  next()
})

export default router