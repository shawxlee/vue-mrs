import Vue from 'vue'
import Router from 'vue-router'
import AllRcmd from './views/AllRcmd.vue' // 先调用主页

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/all-rcmd' // 默认显示为主页
    },
    {
      path: '/all-rcmd',
      name: 'AllRcmd',
      component: AllRcmd, // 正常加载主页
      meta: {
        title: 'AllRcmd',
        keepAlive: true
      }
    },
    {
      path: '/to-watch',
      name: 'ToWatch',
      component: () => import('./views/ToWatch.vue'), // 懒加载第2页
      meta: {
        title: 'ToWatch',
        keepAlive: true
      }
    },
    {
      path: '/my-review',
      name: 'MyReview',
      component: () => import('./views/MyReview.vue'), // 懒加载第3页
      meta: {
        title: 'MyReview',
        keepAlive: true
      }
    },
    {
      path: '/app-setting',
      name: 'AppSetting',
      component: () => import('./views/AppSetting.vue'), // 懒加载第4页
      meta: {
        title: 'AppSetting',
        keepAlive: true
      }
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
})
