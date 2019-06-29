<template>
	<a class="btn btn-sm rounded-pill px-2 toggle-btn">按{{ sortName }}排序
		<span>
      <i class="fas fa-caret-left" :class="{disabled: !isTrue}"></i>
      <i class="fas fa-caret-right" :class="{disabled: isTrue}"></i>
		</span>
	</a>
</template>

<script>
export default {
  name: 'ToggleBtn',
  props: {
  	sortName: {
  		type: String,
  		required: true
  	},
  	isTrue: {
  		type: Boolean,
  		required: true
  	}
  }
}
</script>

<style>
.toggle-btn.btn.btn-sm {
  font-size: .9rem;
  color: #4f94cd;
}
.toggle-btn.btn.btn-sm span {
  display: inline-block;
  width: 1rem;
  font-size: .8rem;
  line-height: 1;
  transform: rotate(90deg);
}
.toggle-btn.btn.btn-sm .fa-caret-left {
  margin-right: .15rem;
}
.toggle-btn.btn.btn-sm.active {
  color: white;
}
.toggle-btn.btn.btn-sm.active .disabled {
  color: #a9a9a9;
}
</style>
