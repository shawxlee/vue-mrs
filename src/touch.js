import Vue from 'vue'
import VueTouch from 'vue-touch'

Vue.use(VueTouch)
VueTouch.config.swipe = {
  threshold: 100
}

export default {
  name: 'v-touch'
}
