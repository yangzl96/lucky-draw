import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../page/home.vue')
  },
  {
    path: '/package',
    name: 'Package',
    component: () => import('../page/package.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


export default router
