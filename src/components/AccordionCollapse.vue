<template>
	<div class="collapse p-3 shadow-sm" :data-parent="parentId">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'AccordionCollapse',
  props: {
  	parentId: {
  		type: String,
  		required: true
  	}
  }
}
</script>
