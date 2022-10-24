<template>
  <form @submit.prevent="createPost">
    <h4>Створення посту:</h4>
    <div>
      <MyInput
        v-focus
        v-model="post.title"
        type="text"
        placeholder="Додати назву"
      />
      {{ post.title }}
    </div>
    <div>
      <MyInput
        v-model="post.body"
        type="text"
        placeholder="Додати опис"
      />
      {{ post.body }}
    </div>
    <my-button
    >
      Створити пост
    </my-button>
  </form>
</template>

<script>
export default {
  name: 'PostForm',
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
      this.post.id = Date.now();
      this.$emit('create', this.post)
      this.post = {
        title: '',
        body: ''
      }
    }
  },
  /*watch: {
    //deep seeked object
    post: {
      handler(newVal) {
        console.log(newVal)
      },
      deep: true
    }
  }*/
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