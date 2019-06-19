<template>
	<nav class="navbar navbar-expand-lg border-bottom fixed-top">
		<span class="navbar-text mb-0 h4">{{ title }}</span>
		<slot></slot>
	</nav>
</template>

<script>
	export default {
		name: 'title-bar',
		props: ['title']
	}
</script>