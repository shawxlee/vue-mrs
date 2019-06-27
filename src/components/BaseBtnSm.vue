<template>
	<a class="btn btn-sm">
    <slot>{{ btnText }}</slot>
	</a>
</template>

<script>
export default {
  name: 'BaseBtnSm',
  props: {
  	btnText: String
  }
}
</script>
