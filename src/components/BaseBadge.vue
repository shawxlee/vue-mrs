<template>
	<span class="badge rounded-0 base-badge"><span>No.</span>{{ badgeNumber }}</span>
</template>

<script>
export default {
  name: 'BaseBadge',
  props: {
    badgeNumber: {
    	type: Number,
  		required: true
    }
  }
}
</script>

<style>
.base-badge.badge {
	position: absolute;
	top: 0;
	left: .5rem;
	font-size: .9rem;
	color: #4f94cd;
	background-color: rgba(255,255,255,.8);
}
.base-badge.badge span {
	font-size: .8rem;
	font-weight: normal;
}
</style>
