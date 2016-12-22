<template>
<div style="margin: 20px 0">  <div class="alert alert-warning alert-dismissible" role="alert">
    {{ message }}
  </div></div>
</template>

<script>
export default {
  name: 'alert',
  props: ['message']
}
</script>

<style scoped>

</style>
