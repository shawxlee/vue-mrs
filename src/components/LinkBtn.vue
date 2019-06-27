<template>
	<a class="btn mb-1" :href="imgUrl" :download="imgName">保存图片</a>
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
