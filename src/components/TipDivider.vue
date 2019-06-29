<template>
	<div class="tip-divider">
		<hr>&nbsp;&nbsp; {{ tipText }} <i class="fas" :class="iconClass"></i> &nbsp;&nbsp;<hr>
	</div>
</template>

<script>
export default {
  name: 'TipDivider',
  props: {
  	tipText: {
  		type: String,
  		required: true
  	},
  	iconClass: {
  		type: String,
  		required: true
  	}
  }
}
</script>

<style>
.tip-divider {
  width: 100%;
  height: 3rem;
  margin-bottom: 4.05rem;
  font-size: 1rem;
  line-height: 3;
  color: #cfcfcf;
  text-align: center;
}
.tip-divider hr {
  display: inline-block;
  width: 30%;
  vertical-align: middle;
}
</style>
