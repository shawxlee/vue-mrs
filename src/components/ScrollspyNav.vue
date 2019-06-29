<template>
	<div class="list-group border-right scrollspy-nav">
		<slot></slot>
	</div>
</template>

<script>
export default {
  name: 'ScrollspyNav'
}
</script>

<style>
.scrollspy-nav.list-group {
	position: fixed;
	top: 6rem;
	left: 0;
	width: 33.3%;
	height: calc(100% - 8.05rem);
	overflow-y: auto;
	overflow-x: hidden;
	background-color: white;
	transition: transform .15s linear;
}
</style>
