<template>
	<div class="divider">
		<hr>&nbsp;&nbsp; {{ dividerText }} <i class="fas" :class="iconClass"></i> &nbsp;&nbsp;<hr>
	</div>
</template>

<script>
export default {
  name: 'PageDivider',
  props: {
  	dividerText: {
  		type: String,
  		required: true
  	},
  	iconClass: {
  		type: String,
  		required: true
  	}
  }
}
</script>
