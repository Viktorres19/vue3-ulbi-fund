<template>
  <button class="button m15-0">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'MyButton'
}
</script>

<style scoped>
.button {
  border: 1px solid green;
  padding: 10px;
  background-color: white;
  color: green;
}
</style>