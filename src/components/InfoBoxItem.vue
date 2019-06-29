<template>
	<div class="d-flex info-box-item">
    <p>{{ infoTitle }}：</p>
    <p>{{ infoCont }}</p>
  </div>
</template>

<script>
export default {
  name: 'InfoBoxItem',
  props: {
  	infoTitle: {
      type: String,
      required: true
    },
  	infoCont: {
  		type: String,
  		required: true
  	}
  }
}
</script>

<style>
.info-box-item p {
  margin: 0;
  font-size: .9rem;
}
.info-box-item p:last-of-type {
  width: 80%;
  white-space: nowrap;
  overflow-x: auto;
}
</style>
