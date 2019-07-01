<template>
	<a class="btn btn-sm base-btn">
    <slot>{{ btnText }}</slot>
	</a>
</template>

<script>
export default {
  name: 'BaseBtn',
  props: {
  	btnText: String
  }
}
</script>

<style>
.base-btn.btn.btn-sm {
  font-size: .9rem;
}
</style>
