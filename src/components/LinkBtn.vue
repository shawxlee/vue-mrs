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
  color: white;
  border-color: white;
}
.link-btn.btn.active {
  color: #a9a9a9;
  border-color: #a9a9a9;
  background-color: transparent;
}
</style>
