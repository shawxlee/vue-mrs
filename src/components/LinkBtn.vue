<template>
	<a class="btn mb-1 link-btn" :href="imgUrl" :download="imgName">保存图片</a>
</template>

<script>
export default {
  name: 'LinkBtn',
  props: {
  	imgUrl: {
  		type: String,
  		required: true
  	},
  	imgName: {
  		type: String,
  		required: true
  	}
  }
}
</script>

<style>
.link-btn.btn {
  width: 6rem;
}
</style>
