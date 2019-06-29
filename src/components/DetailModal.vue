<template>
	<div class="detail-modal">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'DetailModal'
}
</script>

<style>
.detail-modal {
	position: fixed;
	right: 0;
	bottom: calc(3.8rem + 1px);
	left: 0;
	z-index: 1050;
}
</style>
