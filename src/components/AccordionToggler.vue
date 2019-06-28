<template>
	<div class="accordion-toggler px-3 shadow-sm collapsed" data-toggle="collapse" :data-target="targetId">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'AccordionToggler',
  props: {
  	targetId: {
  		type: String,
  		required: true
  	}
  }
}
</script>
