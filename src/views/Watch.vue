<template>
	<div id="watch">
		<!-- 顶部标题栏 -->
		<title-bar :class="{'header-up': headerHidden}" id="watch-header">
			待看片单
		</title-bar>
	</div>
</template>

<script>
	import TitleBar from '@/components/TitleBar.vue'

	export default {
		name: 'watch',
		components: {
			TitleBar
		}
	}
</script>

<style>
/* 顶部标题栏 */
#watch-header {
	height: 3rem;
	color: white;
	background-color: #4f94cd;
}
.header-up {
	top: -2.5rem;
}
</style>