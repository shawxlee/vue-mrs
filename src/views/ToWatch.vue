<template>
	<div class="container-fluid">
		<!-- 顶部导航栏 -->
		<transition name="toggle">
			<keep-alive>
				<FullHeader pageTitle="待看片单" v-if="showHeader"/>
				<MiniHeader pageTitle="待看片单" v-else/>
			</keep-alive>
		</transition>
	</div>
</template>

<script>
import FullHeader from '../components/FullHeader'
import MiniHeader from '../components/MiniHeader'

export default {
  name: 'ToWatch',
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
