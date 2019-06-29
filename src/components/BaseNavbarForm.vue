<template>
	<form class="base-navbar-form">
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'BaseNavbarForm'
}
</script>

<style>
.base-navbar-form {
	position: absolute;
	top: 0;
	right: 0;
	width: calc(100% - 8rem);
	margin: 0;
	padding: 0;
}
</style>
