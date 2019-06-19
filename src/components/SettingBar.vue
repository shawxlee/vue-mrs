<template>
	<div class="setting-bar">
		<ul>
			<li>侧边栏菜单项1</li>
			<li>侧边栏菜单项2</li>
			<li>侧边栏菜单项3</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'setting-bar'
	}
</script>

<style>
.setting-bar {
	position: fixed;
	top: 0;
	right: 0;
	bottom: calc(100% - 3.8rem);
	z-index: 1060;
	width: 50%;
}
</style>
