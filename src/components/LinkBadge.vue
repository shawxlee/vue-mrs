<template>
	<a class="badge" :href="badgeUrl" target="_blank">{{ badgeText }}</a>
</template>

<script>
export default {
  name: 'LinkBadge',
  props: {
  	badgeUrl: {
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
