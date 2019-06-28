<template>
	<a class="btn btn-sm rounded-pill px-2">按{{ sortName }}排序
		<span>
      <i class="fas fa-caret-left" :class="{disabled: !isTrue}"></i>
      <i class="fas fa-caret-right" :class="{disabled: isTrue}"></i>
		</span>
	</a>
</template>

<script>
export default {
  name: 'SortBtn',
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
