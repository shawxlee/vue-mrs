//入口文件
import Vue from 'vue'    //引入vue框架
import App from './App.vue'    //引入根组件
import router from './router'    //引入路由设置
import $ from 'jquery'    //引入jquery框架
import 'bootstrap'    //引入bootstrap.js
import 'bootstrap/dist/css/bootstrap.min.css'    //引入bootstrap.css
import '@fortawesome/fontawesome-free/css/all.css'    //引入font-awesome
import './assets/style.css'    //引入公共样式表
//关闭生产模式下给出的提示
Vue.config.productionTip = false
//定义根实例
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
//ES6 箭头函数的写法，使用render函数渲染一个视图，然后提供给el挂载