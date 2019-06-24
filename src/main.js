import Vue from 'vue'
import App from './App.vue'
import router from './router'
import touch from './touch'
// 引入CSS样式库
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './assets/light-theme.css'
// 引入JS脚本库
import './assets/font-size.js'
import 'bootstrap/dist/js/bootstrap.min.js'

Vue.config.productionTip = false
// 将router,touch和App挂载到#app下
new Vue({
  router,
  touch,
  render: h => h(App)
}).$mount('#app')
