<template>
  <div class="post">
    <div><strong>Назва: </strong>{{ post.title }}</div>
    <div><strong>Опис: </strong>{{ post.description }}</div>
  </div>
</template>

<script>
export default {
  name: "PostItem",
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.post {
  padding: 10px;
  border: 2px solid green;
  margin-top: 5px;
}
.post:last-of-type {
  margin-bottom: 5px;
}
</style>