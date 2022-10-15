<template>
  <form action="" @submit.prevent="createPost">
    <h4>Створення посту:</h4>
    <div>
      <input
        v-model="post.title"
        type="text"
        placeholder="Додати назву"
      >
      {{ post.title }}
    </div>
    <div>
      <input
        v-model="post.body"
        type="text"
        placeholder="Додати опис"
      >
      {{ post.body }}
    </div>
    <button>Створити запис</button>
  </form>
</template>

<script>
export default {
  name: "PostForm",
  data() {
    return {
      post: {
        title: '',
        body: ''
      }
    }
  },
  methods: {
    createPost() {
      let newItem = {
        id: Date.now(),
        title: this.post.title,
        description: this.post.body
      }
      console.log(newItem);
      this.$emit('create', newItem)
      this.post.title = '';
      this.post.body = '';
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
form > * {
  margin-top: 5px;
}
form input, form button {
  border: 1px solid green;
  padding: 10px;
  background-color: white;
  color: green;
}
</style>