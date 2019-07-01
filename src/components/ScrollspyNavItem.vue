<template>
	<a class="list-group-item list-group-item-action p-2 border-left-0 border-right-0 rounded-0 scrollspy-nav-item" :href="scrId">
		<slot></slot>
	</a>
</template>

<script>
export default {
  name: 'ScrollspyNavItem',
  props: {
    scrId: {
    	type: String,
  		required: true
    }
  }
}
</script>

<style>
.scrollspy-nav-item.list-group-item {
  width: calc(100% + 1px);
  font-size: .9rem;
  white-space: nowrap;
}
</style>
