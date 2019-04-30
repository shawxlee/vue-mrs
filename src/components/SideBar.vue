<template>
	<div id="sideBar" class="sidebarClass">
		<ul class="text-light py-3">
			<li>侧边栏菜单项1</li>
			<li>侧边栏菜单项2</li>
			<li>侧边栏菜单项3</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'side-bar'
	}
</script>

<style>
.sidebarClass {
	position: fixed;
	right: -50%;
	width: 50%;
	height: calc(100vh - 3.5rem);
	background: #E8E8E8;
	z-index: 9999;
	transition: width 1s;
}
.addWidth {
	width: 100%;
}
</style>