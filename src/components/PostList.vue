<template>
  <div class="post-list">
    <h3>Перелік користувачів:</h3>
    <PostItem :post="post" v-for="post in posts" :key="post.id" />
  </div>
</template>

<script>
import PostItem from "./PostItem";
export default {
  name: "PostList",
  components: {PostItem},
  props: {
    posts: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.post-list {
  padding-top: 15px;
}
</style>