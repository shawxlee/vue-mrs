<template>
	<div class="img-modal p-3 pb-1">
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

<style>
.img-modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: calc(3.8rem + 1px);
  left: 0;
  z-index: 1050;
  text-align: center;
}
.img-modal p {
  width: 100%;
  font-size: .9rem;
  text-align: center;
  color: #cfcfcf;
  transition: all .15s linear;
}
.img-modal span {
  color: white;
}
</style>
