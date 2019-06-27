<template>
	<li class="nav-item ml-3">
		<a class="nav-link rounded-0" :class="{active: modeActive}" data-toggle="pill" :href="modeId">{{ modeName }}</a>
	</li>
</template>

<script>
export default {
  name: 'BaseHeaderNavItem',
  props: {
    modeActive: Boolean,
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
