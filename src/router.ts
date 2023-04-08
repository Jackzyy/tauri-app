import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

// 创建路由
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/home.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
