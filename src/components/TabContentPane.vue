<template>
	<div class="tab-pane" :class="{active: isTrue}">
		<slot></slot>
	</div>
</template>

<script>
export default {
  name: 'TabContentPane',
  props: {
    isTrue: Boolean
  }
}
</script>
