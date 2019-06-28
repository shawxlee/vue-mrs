<template>
	<div class="d-flex">
    <p>{{ infoTitle }}：</p>
    <p>{{ infoContent }}</p>
  </div>
</template>

<script>
export default {
  name: 'InfoBoxItem',
  props: {
  	infoTitle: {
      type: String,
      required: true
    },
  	infoContent: {
  		type: String,
  		required: true
  	}
  }
}
</script>
