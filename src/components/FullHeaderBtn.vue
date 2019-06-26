<template>
	<li class="nav-item ml-3">
		<a class="nav-link" :class="{active: isActive}" data-toggle="pill" :href="modeId">{{ modeName }}</a>
	</li>
</template>

<script>
export default {
  name: 'FullHeaderBtn',
  props: {
    isActive: Boolean,
    modeId: String,
    modeName: String
  }
}
</script>
