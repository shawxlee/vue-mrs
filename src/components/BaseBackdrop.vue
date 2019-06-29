<template>
	<div class="base-backdrop"></div>
</template>

<script>
export default {
  name: 'BaseBackdrop'
}
</script>

<style>
.base-backdrop {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 3.8rem;
	left: 0;
	z-index: 1040;
	background-color: rgba(0,0,0,.5);
}
</style>
