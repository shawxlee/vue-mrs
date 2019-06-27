import Vue from 'vue'
import VueTouch from 'vue-touch'

Vue.use(VueTouch)

VueTouch.config.swipeup = {
  threshold: 50
}

VueTouch.config.swipedown = {
  threshold: 100
}

export default {
  name: 'v-touch'
}
