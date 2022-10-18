<template>
  <div class="post-list">
    <template v-if="posts.length">
      <h3>Перелік користувачів:</h3>
      <PostItem
        :post="post"
        v-for="post in posts"
        :key="post.id"
        @remove="$emit('remove', post)"
      />
    </template>
    <template v-else>
      <h3>Ваш перелік користувачів пустий. Будь ласка, додайте першого користувача.</h3>
    </template>
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