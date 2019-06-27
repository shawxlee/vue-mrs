<template>
	<div class="d-flex">
    <p><slot>{{ flexTitle }}：</slot></p>
    <p>{{ flexContent }}</p>
  </div>
</template>

<script>
export default {
  name: 'FlexBox',
  props: {
  	flexTitle: String,
  	flexContent: {
  		type: String,
  		required: true
  	}
  }
}
</script>
