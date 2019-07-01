<template>
	<div class="base-navbar-toggler" data-toggle="collapse" :data-target="tarId">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BaseNavbarToggler',
  props: {
  	tarId: {
  		type: String,
  		required: true
  	}
  }
}
</script>

<style>
.base-navbar-toggler {
  width: calc(100% - 2.3rem);
  font-size: 1rem;
}
</style>
