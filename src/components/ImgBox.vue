<template>
	<div class="img-box">
		<slot></slot>
	</div>
</template>

<script>
export default {
  name: 'ImgBox'
}
</script>

<style>
.img-box {
	position: relative;
	width: 5.9rem;
	height: 8.8rem;
	overflow: hidden;
	border-radius: .3rem;
}
</style>
