<template>
	<div class="bg-box mt-2 px-2">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BgBox'
}
</script>

<style>
.bg-box {
	height: 2.4rem;
	font-size: 1rem;
	line-height: 2.4;
	color: #1c1c1c;
	background-color: #f5f5f5;
	border-radius: .3rem;
}
</style>
