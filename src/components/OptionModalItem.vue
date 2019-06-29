<template>
	<div class="option-modal-item">
		<a class="btn mb-1 px-0"><i class="fas" :class="iconClass"></i></a>
		<br>
    <slot>{{ optText }}</slot>
	</div>
</template>

<script>
export default {
  name: 'OptionModalItem',
  props: {
    iconClass: {
    	type: String,
  		required: true
    },
    optText: String
  }
}
</script>

<style>
.option-modal-item {
  margin: auto;
  font-size: .8rem;
  text-align: center;
  color: white;
}
.option-modal-item .btn {
  width: 2.5rem;
  height: 2.5rem;
  padding-top: .625rem;
  font-size: 1.25rem;
  line-height: 1;
  background-color: white;
  border: none;
  border-radius: 50%;
}
.option-modal-item i {
  color: #4f94cd;
}
</style>
