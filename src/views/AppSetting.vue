<template>
	<div class="container-fluid">
		<!-- 顶部导航栏 -->
    <BaseNavbar class="header" :class="{upward: headerHidden}">
      <BaseNavbarTitle v-show="!headerHidden" titleText="应用设置"/>
      <!-- 小标题 -->
      <transition name="fade">
        <BaseNavbarTitle class="header-min" v-show="headerHidden" titleText="应用设置"/>
      </transition>
    </BaseNavbar>
	</div>
</template>

<script>
import BaseNavbar from '../components/BaseNavbar'
import BaseNavbarTitle from '../components/BaseNavbarTitle'

export default {
  name: 'AppSetting',
  components: {
    BaseNavbar,
    BaseNavbarTitle
  },
  data () {
    return {
      headerHidden: false
    }
  }
}
</script>
