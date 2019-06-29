<template>
	<span class="navbar-text mb-0 h4">{{ titleText }}</span>
</template>

<script>
export default {
  name: 'BaseNavbarTitle',
  props: {
    titleText: {
      type: String,
      required: true
    }
  }
}
</script>
