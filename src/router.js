import Vue from 'vue'
import Router from 'vue-router'
import AllRcmd from './views/AllRcmd.vue'    // 先调用主页

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [
  {
    path: '/',
    redirect: '/all-rcmd'    // 默认显示为主页
  },
  {
    path: '/all-rcmd',
    name: 'all-rcmd',
    component: AllRcmd,    // 正常加载主页
    meta: {
      title: 'all-rcmd',
      keepAlive: true
    }
  },
  {
    path: '/to-watch',
    name: 'to-watch',
    component: () => import('./views/ToWatch.vue'),    // 懒加载第2页
    meta: {
      title: 'to-watch',
      keepAlive: true
    }
  },
  {
    path: '/my-review',
    name: 'my-review',
    component: () => import('./views/MyReview.vue'),    // 懒加载第3页
    meta: {
      title: 'my-review',
      keepAlive: true
    }
  },
  {
    path: '/app-setting',
    name: 'app-setting',
    component: () => import('./views/AppSetting.vue'),    // 懒加载第4页
    meta: {
      title: 'app-setting',
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
