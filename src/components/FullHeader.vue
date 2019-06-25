<template>
	<nav class="navbar navbar-expand-lg fixed-top border-bottom full-header">
		<span class="navbar-text mb-0 h4">{{ pageTitle }}</span>
		<!-- 模式切换 -->
		<ul class="nav nav-pills">
			<slot></slot>
		</ul>
	</nav>
</template>

<script>
	export default {
		name: 'FullHeader',
		props: {
			pageTitle: {
				type: String,
				required: true
			}
		}
	}
</script>
