<template>
	<div class="option">
		<a class="btn px-0"><i class="fas" :class="iconClass"></i></a>
		<br>
		{{ optionText }}
	</div>
</template>

<script>
export default {
  name: 'IconOptionsItem',
  props: {
    iconClass: {
    	type: String,
  		required: true
    },
    optionText: {
    	type: String,
  		required: true
    }
  }
}
</script>
