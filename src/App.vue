<template>
  <div class="container">
    <PostForm @create="create" />
    <PostList
      :posts="posts"
    />
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
export default {
  name: 'App',
  components: {PostList, PostForm},
  data() {
    return {
      posts: [
        { id: 1, title: 'Javascript', description: 'JS' },
        { id: 2, title: 'PHP', description: 'Elephant' },
        { id: 1, title: 'Ruby', description: 'Some chrystal' },
      ]
    }
  },
  methods: {
    create(newPost) {
      this.posts.push(newPost);
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
</style>