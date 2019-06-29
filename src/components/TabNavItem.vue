<template>
	<li class="nav-item ml-3">
		<a class="nav-link px-0 rounded-0" :class="{active: isTrue}" data-toggle="pill" :href="tabId">{{ tabName }}</a>
	</li>
</template>

<script>
export default {
  name: 'TabNavItem',
  props: {
    isTrue: Boolean,
    tabId: {
    	type: String,
  		required: true
    },
    tabName: {
    	type: String,
  		required: true
    }
  }
}
</script>
