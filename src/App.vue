<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <ul class="nav nav-justified border-top fixed-bottom" id="footer">
      <li class="nav-item">
        <router-link class="nav-link" to="/all"><i class="fas fa-star"></i><br>全部</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/watch"><i class="fas fa-play-circle"></i><br>待看</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/review"><i class="fas fa-poll-h"></i><br>回顾</router-link>
      </li>
      <li class="nav-item">
        <v-touch tag="a" @tap="showSetting = !showSetting"><i class="fas fa-cog"></i><br>设置</v-touch>
      </li>
    </ul>
    <transition name="slide">
      <setting-bar v-show="showSetting"></setting-bar>
    </transition>
  </div>
</template>

<script>
  import SettingBar from '@/components/SettingBar.vue'

  export default {
    components: {
      SettingBar
    },
    data() {
      return {
        showSetting: false
      }
    }
  }
</script>

<style>
* {
  touch-action: auto !important;
}
#app {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  padding-top: 6rem;
  background-color: #e8e8e8;
}
#footer {
  height: 3.8rem;
  background-color: white;
}
#footer .nav-link {
  padding-top: .6rem;
  font-size: .8rem;
  color: #a9a9a9;
}
#footer .nav-link i {
  font-size: 1.5rem;
}
#footer .router-link-active {
  color: #4f94cd;
}
/* 过渡：左滑/收起 */
.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}
.slide-enter-to,
.slide-leave {
  transform: translateX(0);
}
.slide-enter-active {
  transition: transform .3s linear;
}
.slide-leave-active {
  transition: transform .1s linear;
}
</style>