<template>
	<li class="nav-item ml-3">
		<a class="nav-link rounded-0" :class="{active: isTrue}" data-toggle="pill" :href="modeId">{{ modeName }}</a>
	</li>
</template>

<script>
export default {
  name: 'BaseNavbarNavItem',
  props: {
    isTrue: Boolean,
    modeId: {
    	type: String,
  		required: true
    },
    modeName: {
    	type: String,
  		required: true
    }
  }
}
</script>
