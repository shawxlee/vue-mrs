import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'

import '@/assets/font-size.js'
import 'bootstrap/dist/js/bootstrap.min.js'

var VueTouch = require('vue-touch')
VueTouch.config.swipe = {
	threshold: 100
}
Vue.use(VueTouch, {name: 'v-touch'})

Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
