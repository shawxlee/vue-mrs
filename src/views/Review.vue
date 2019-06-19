<template>
	<div id="review">
		<!-- 顶部标题栏 -->
		<title-bar :class="{'header-up': headerHidden}" id="review-header">
			我的回顾
		</title-bar>
	</div>
</template>

<script>
	import TitleBar from '@/components/TitleBar.vue'

	export default {
		name: 'review',
		components: {
			TitleBar
		}
	}
</script>

<style>
/* 顶部标题栏 */
#review-header {
	height: 3rem;
	color: white;
	background-color: #4f94cd;
}
.header-up {
	top: -2.5rem;
}
</style>