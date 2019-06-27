<template>
	<button class="navbar-toggler" type="button">
		<i class="fas" :class="iconClass"></i>
    <slot></slot>
	</button>
</template>

<script>
export default {
  name: 'IconBtn',
  props: {
  	iconClass: {
  		type: String,
  		required: true
  	}
  }
}
</script>
