import Vue from 'vue'    //引入vue框架
import Router from 'vue-router'    //引入路由依赖
import AllFilms from './views/AllFilms.vue'    //引入组件
import ToWatch from './views/ToWatch.vue'
import Watched from './views/Watched.vue'
//使用路由依赖
Vue.use(Router)
//定义路由
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'all',
      component: AllFilms
    },
    {
      path: '/to-watch',
      name: 'to-watch',
      component: ToWatch
    },
    {
      path: '/watched',
      name: 'watched',
      component: Watched
    }
  ]
})
