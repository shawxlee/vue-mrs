<template>
	<div>
    <slot></slot>
    <br>
    <p :class="{invisible: tipsInvisible}">图片 <span>{{ imgName }}</span> 已保存到手机相册</p>
  </div>
</template>

<script>
export default {
  name: 'ImgModal',
  props: {
  	tipsInvisible: {
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
