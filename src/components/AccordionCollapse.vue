<template>
	<div class="collapse p-3 shadow-sm" :data-parent="parId">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'AccordionCollapse',
  props: {
  	parId: {
  		type: String,
  		required: true
  	}
  }
}
</script>
