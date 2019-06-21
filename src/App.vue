<template>
  <div id="app">
    <router-view/>
    <transition name="slide-left">
      <router-view name=""/>
    </transition>

    <ul class="nav nav-justified border-top fixed-bottom footer">
      <li class="nav-item">
        <router-link class="nav-link router-link-active" to="/all" exact><i class="fas fa-star"></i><br>全部</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/watch"><i class="fas fa-play-circle"></i><br>待看</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/review"><i class="fas fa-poll-h"></i><br>回顾</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/setting"><i class="fas fa-cog"></i><br>设置</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import SettingBar from './components/SettingBar.vue'

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