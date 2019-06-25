<template>
	<ul class="nav justify-content-center fixed-top border-bottom mini-header">
		<li class="nav-item">{{ pageTitle }}</li>
	</ul>
</template>

<script>
	export default {
		name: 'MiniHeader',
		props: {
			pageTitle: {
				type: String,
				required: true
			}
		}
	}
</script>
