<template>
  <input :value="value" @input="updateInput" class="input" type="text">
</template>

<script>
export default {
  name: 'MyInput',
  props: {
    value: [String, Number],
    myValue: [String]
  },
  methods: {
    updateInput(event) {
      this.$emit('update:value', event.target.value)
      this.$emit('update:myValue', event.target.value)
    }
  }
}
</script>

<style scoped>
input {
  border: 1px solid green;
  padding: 10px;
  background-color: white;
  color: green;
}
</style>