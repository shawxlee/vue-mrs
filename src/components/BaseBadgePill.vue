<template>
	<span class="badge badge-pill ml-1 base-badge-pill">{{ badgeNumber }}</span>
</template>

<script>
export default {
  name: 'BaseBadgePill',
  props: {
    badgeNumber: {
    	type: Number,
  		required: true
    }
  }
}
</script>

<style>
.base-badge-pill.badge {
	height: 1rem;
	font-size: .8rem;
	line-height: .8;
	color: white;
	background-color: #4f94cd;
	transform: translateY(-.07rem);
}
</style>
