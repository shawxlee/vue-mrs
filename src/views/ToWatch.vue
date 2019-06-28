<template>
	<div class="container-fluid">
		<!-- 顶部导航栏 -->
    <BaseNavbar class="header" :class="{upward: headerHidden}">
      <BaseNavbarTitle :class="{'d-none': headerHidden}" pageTitle="待看片单"/>
      <!-- 小标题 -->
      <transition name="fade">
        <BaseNavbarTitle class="header-min" v-if="headerHidden" pageTitle="待看片单"/>
      </transition>
    </BaseNavbar>
  </div>
</template>

<script>
import BaseNavbar from '../components/BaseNavbar'
import BaseNavbarTitle from '../components/BaseNavbarTitle'

export default {
  name: 'ToWatch',
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
