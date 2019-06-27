<template>
	<div class="container-fluid">
		<!-- 顶部导航栏 -->
    <BaseHeader class="header" :class="{upward: headerHidden}">
      <BaseHeaderTitle :class="{'d-none': headerHidden}" pageTitle="应用设置"/>
      <!-- 小标题 -->
      <transition name="fade">
        <BaseHeaderTitle class="header-min" v-if="headerHidden" pageTitle="应用设置"/>
      </transition>
    </BaseHeader>
	</div>
</template>

<script>
import BaseHeader from '../components/BaseHeader'
import BaseHeaderTitle from '../components/BaseHeaderTitle'

export default {
  name: 'AppSetting',
  components: {
    BaseHeader,
    BaseHeaderTitle
  },
  data () {
    return {
      headerHidden: false
    }
  }
}
</script>
