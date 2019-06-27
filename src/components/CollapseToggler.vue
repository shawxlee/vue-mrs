<template>
	<div data-toggle="collapse" :data-target="collapseId">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CollapseToggler',
  props: {
  	collapseId: {
  		type: String,
  		required: true
  	}
  }
}
</script>
