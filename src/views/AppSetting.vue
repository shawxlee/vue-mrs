<template>
	<div class="container-fluid">
		<!-- 顶部导航栏 -->
		<transition name="toggle">
			<keep-alive>
				<FullHeader pageTitle="应用设置" v-if="showHeader"/>
				<MiniHeader pageTitle="应用设置" v-else/>
			</keep-alive>
		</transition>
	</div>
</template>

<script>
import FullHeader from '../components/FullHeader'
import MiniHeader from '../components/MiniHeader'

export default {
  name: 'AppSetting',
  components: {
    FullHeader,
    MiniHeader
  },
  data () {
    return {
      showHeader: true
    }
  }
}
</script>
