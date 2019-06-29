<template>
	<div class="info-box">
		<slot></slot>
	</div>
</template>

<script>
export default {
  name: 'InfoBox'
}
</script>

<style>
.info-box {
	width: calc(100% - 5.9rem);
	line-height: 1.35;
	color: #828282;
}
</style>
