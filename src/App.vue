<template>
  <div id="app">
    <router-view/>

    <ul class="nav nav-justified border-top fixed-bottom footer">
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
        <v-touch class="nav-link" :class="{active: showSetting}" @tap="showSetting = !showSetting"><i class="fas fa-cog"></i><br>设置</v-touch>
      </li>
    </ul>

    <transition name="slide-left">
      <Setting v-show="showSetting"/>
    </transition>
  </div>
</template>

<script>
  import Setting from './components/Setting.vue'

  export default {
    components: {
      Setting
    },
    data() {
      return {
        showSetting: false
      }
    }
  }
</script>