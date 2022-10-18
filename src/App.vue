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
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import MyDialog from "./components/UI/MyDialog";
export default {
  name: 'App',
  components: {MyDialog, PostList, PostForm},
  data() {
    return {
      posts: [
        { id: 1, title: 'Javascript', description: 'JS' },
        { id: 2, title: 'PHP', description: 'Elephant' },
        { id: 3, title: 'Ruby', description: 'Some chrystal' },
      ],
      dialogVisible: false,
      modificatorValue: ''
    }
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
    }
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
.m15-0 {
  margin: 15px 0;
}
</style>