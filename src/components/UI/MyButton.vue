<template>
  <button :style="{ margin: buttonStyles.margin }" class="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'MyButton',
  props: ['buttonStyles']
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