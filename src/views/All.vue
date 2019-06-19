<template>
	<div id="all">
		<!-- 顶部标题栏 -->
		<title-bar :class="{'header-up': headerHidden}" id="all-header" title="全部影片">
			<!-- 模式切换 -->
			<ul class="nav nav-pills">
				<li class="nav-item ml-3">
					<a class="nav-link rounded-0 px-0 active" data-toggle="pill" href="#full-mode">全览模式</a>
				</li>
				<li class="nav-item ml-3">
					<a class="nav-link rounded-0 px-0" data-toggle="pill" href="#mini-mode">简约模式</a>
				</li>
				<li class="nav-item ml-3">
					<a class="nav-link rounded-0 px-0" data-toggle="pill" href="#series-mode">系列模式</a>
				</li>
			</ul>
		</title-bar>

		<!-- 工具栏 -->
		<tool-bar :class="{'toolbar-up': headerHidden}"></tool-bar>

		<!-- 更新状态栏 -->
		<transition name="pull">
			<reload-bar v-if="showStatus"></reload-bar>
		</transition>

		<!-- 电影标签页 -->
		<reload-bar></reload-bar>
	</div>
</template>

<script>
	import TitleBar from '@/components/TitleBar.vue'

	export default {
		name: 'all',
		components: {
			TitleBar,
			ToolBar
		},
		data() {
			return {
				headerHidden: false
			}
		}
	}
</script>

<style>
/* 顶部标题栏 */
#all-header {
	height: 3rem;
	color: white;
	background-color: #4f94cd;
}
.header-up {
	top: -2.5rem;
}
#all-header .nav-link {
	height: 1.5rem;
	padding-top: .3rem;
	font-size: .9rem;
	line-height: 1;
	color: #a9a9a9;
}
#all-header .active {
	color: white;
	border-bottom: .1rem solid white; 
	background-color: transparent;
}

/* 工具栏 */
.toolbar-up {
	top: .5rem;
}

/* 更新状态栏 */
.divider {
	width: 100%;
	height: 3rem;
	margin-top: .25rem;
	font-size: 1rem;
	line-height: 3;
	color: #cfcfcf;
	text-align: center;
}
.divider hr {
	display: inline-block;
	width: 30%;
	vertical-align: middle;
}
/* 过渡：下拉/收起 */
.pull-enter,
.pull-leave-to {
	margin-top: -3rem;
}
.pull-enter-to,
.pull-leave {
	margin-top: .25rem;
}
.pull-enter-active {
	transition: margin-top .1s linear;
}
.pull-leave-active {
	transition: margin-top .3s linear;
}
</style>