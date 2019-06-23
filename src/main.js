import Vue from 'vue'
import App from './App.vue'
import router from './router'
import touch from './touch'
import axios from 'axios'
// 引入CSS样式库
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './assets/light-theme.css'
// 引入JS脚本库
import './assets/font-size'
import 'bootstrap/dist/js/bootstrap'

Vue.config.productionTip = false
// 将router,touch,axios和vm挂载到#vm下
new Vue({
	router,
	touch,
	axios,
	render: h => h(App)
}).$mount('#app')