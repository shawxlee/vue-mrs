<template>
	<div class="shortcut-btn">
    <i class="fas" :class="iconClass"></i>
  </div>
</template>

<script>
export default {
  name: 'ShortcutBtn',
  props: {
    iconClass: {
    	type: String,
  		required: true
    }
  }
}
</script>

<style>
.shortcut-btn {
  position: fixed;
  right: .7rem;
  bottom: 7.5rem;
  width: 2.5rem;
  height: 2.5rem;
  padding-top: .625rem;
  font-size: 1.25rem;
  line-height: 1;
  text-align: center;
  border-radius: 50%;
  opacity: .5;
}
</style>
