<template>
  <div class="post">
    <div>
      <div>{{ post.id }}</div>
      <div><strong>Назва: </strong>{{ post.title }}</div>
      <div><strong>Опис: </strong>{{ post.body }}</div>
    </div>
    <div class="post__buttons">
      <my-button @click="$router.push(`/posts/${post.id}`)">
        Відкрити
      </my-button>
      <my-button @click="$emit('remove', post)">
        Видалити пост
      </my-button>
    </div>
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
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.post:last-of-type {
  margin-bottom: 5px;
}
.post__buttons {
  display: flex;
  align-items: center;
  margin-left: 5px;
}
.button {
  margin-left: 5px;
}
</style>