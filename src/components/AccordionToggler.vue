<template>
	<div class="accordion-toggler px-3 shadow-sm collapsed" data-toggle="collapse" :data-target="tarId">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'AccordionToggler',
  props: {
  	tarId: {
  		type: String,
  		required: true
  	}
  }
}
</script>

<style>
.accordion-toggler {
  padding-top: .7rem;
  padding-bottom: .7rem;
  color: white;
  background-color: #4f94cd;
  border-radius: .5rem .5rem 0 0;
}
.accordion-toggler.collapsed {
  background-color: white;
  border-radius: .5rem;
  color: #828282;
}
</style>
