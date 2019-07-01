<template>
	<div class="base-card">
		<slot></slot>
	</div>
</template>

<script>
export default {
  name: 'BaseCard'
}
</script>

<style>
.base-card {
	position: relative;
}
</style>
