<template>
	<a class="badge" :href="webUrl" target="_blank">{{ badgeText }}</a>
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
