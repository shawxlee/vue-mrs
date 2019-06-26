<template>
	<div class="container-fluid">
		<!-- 顶部导航栏 -->
		<transition name="toggle">
			<keep-alive>
				<FullHeader pageTitle="我的影记" v-if="showHeader"/>
				<MiniHeader pageTitle="我的影记" v-else/>
			</keep-alive>
		</transition>
	</div>
</template>

<script>
import FullHeader from '../components/FullHeader'
import MiniHeader from '../components/MiniHeader'

export default {
  name: 'MyReview',
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
