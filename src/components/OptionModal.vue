<template>
	<div class="d-flex justify-content-center option-modal">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'OptionModal'
}
</script>

<style>
.option-modal {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
}
</style>
