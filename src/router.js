import Vue from 'vue'
import Router from 'vue-router'
import All from './views/All.vue'    // 先调用主页

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/all',
      name: 'all',
      component: All
    },
    {
      path: '/watch',
      name: 'watch',
      component: () => import('./views/Watch.vue')    // 懒加载第2页
    },
    {
      path: '/review',
      name: 'review',
      component: () => import('./views/Review.vue')    // 懒加载第3页
    }
  ]
})
