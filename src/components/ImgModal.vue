<template>
	<div class="film-card-poster-large p-3 pb-1">
    <slot></slot>
    <br>
    <p :class="{invisible: isTrue}">图片 <span>{{ imgName }}</span> 已保存到手机相册</p>
  </div>
</template>

<script>
export default {
  name: 'ImgModal',
  props: {
  	isTrue: {
  		type: Boolean,
  		required: true
  	},
    imgName: {
      type: String,
      required: true
    }
  }
}
</script>
