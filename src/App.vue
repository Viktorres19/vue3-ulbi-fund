<template>
  <div class="container">
    <h1>Сторінка з користувачами</h1>
    <my-button
      @click="showDialog"
    >
      Створити користувача
    </my-button>
    <my-dialog v-model:show="dialogVisible">
      <PostForm @create="create" />
    </my-dialog>
    <PostList
      :posts="posts"
      @remove="removePost"
    />
  </div>
</template>

<script>
import axios from 'axios';
import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList';

export default {
  name: 'App',
  components: {PostList, PostForm},
  data() {
    return {
      posts: [],
      modificatorValue: ''
    }
  },
  created() {
    this.fetchPosts();
  },
  methods: {
    create(newPost) {
      this.posts.push(newPost);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true
    },
    async fetchPosts() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
        this.posts = response.data;
        console.log(response.data);
      } catch (e) {
        alert('Помилка')
      }
    },
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  background-color: lightblue;
}
.container {
  margin: 0 auto;
  padding: 0 15px 15px;
  max-width: 1200px;
}
.post .button {
  margin-left: 10px;
}
</style>