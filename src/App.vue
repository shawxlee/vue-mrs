<!-- 根组件 -->
<template>
	<div id="app">
		<!-- 切换组件的过渡效果 -->
		<transition name="fade" mode="out-in">
			<!-- 对组件进行缓存 -->
			<keep-alive>
				<!-- 路由匹配到的组件将渲染在这里 -->
				<router-view></router-view>
			</keep-alive>
		</transition>
		<!-- 引入用于跳转的路由组件 -->
		<foot-nav></foot-nav>
	</div>
</template>

<script>
	import FootNav from './components/FootNav'

	export default {
		components: {
			FootNav
		}
	}
</script>

<style scoped>
/* 加入一个淡入淡出效果 */
.fade-enter-active, .fade-leave-active {
	transition: all .3s;
}
.fade-enter, .fade-leave-to {
	opacity: 0;
}
</style>
