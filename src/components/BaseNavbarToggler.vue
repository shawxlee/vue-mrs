<template>
	<div data-toggle="collapse" :data-target="targetId">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BaseNavbarToggler',
  props: {
  	targetId: {
  		type: String,
  		required: true
  	}
  }
}
</script>
