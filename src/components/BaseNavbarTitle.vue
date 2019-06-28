<template>
	<span class="navbar-text mb-0 h4">{{ pageTitle }}</span>
</template>

<script>
export default {
  name: 'BaseNavbarTitle',
  props: {
    pageTitle: {
      type: String,
      required: true
    }
  }
}
</script>
