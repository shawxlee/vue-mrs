<template>
	<a class="badge link-badge" :href="webUrl" target="_blank">{{ badgeText }}</a>
</template>

<script>
export default {
  name: 'LinkBadge',
  props: {
  	webUrl: {
  		type: String,
  		required: true
  	},
  	badgeText: {
  		type: String,
  		required: true
  	}
  }
}
</script>

<style>
.link-badge.badge {
  font-size: 1rem;
  font-weight: normal;
  color: white;
}
</style>
