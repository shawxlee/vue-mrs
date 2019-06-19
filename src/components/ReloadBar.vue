<template>
	<div class="divider">
		<template v-if="isSuccess">
			<hr>&nbsp;&nbsp; 更新成功 <i class="fas fa-check-circle"></i> &nbsp;&nbsp;<hr>
		</template>
		<template v-else-if="isError">
			<hr>&nbsp;&nbsp; 更新失败 <i class="fas fa-exclamation-circle"></i> &nbsp;&nbsp;<hr>
		</template>
		<template v-else>
			<hr>&nbsp;&nbsp; 正在更新 <i class="fas fa-sync-alt"></i> &nbsp;&nbsp;<hr>
		</template>
	</div>
</template>

<script>
	export default {
		name: 'reload-bar',
		
	}
</script>

<style>
/* 动画：图标旋转 */
.fa-sync-alt,
.fa-sync {
	animation: rotating 1s linear infinite;
}
@keyframes rotating {
	100% {
		transform: rotate(360deg);
	}
}
</style>