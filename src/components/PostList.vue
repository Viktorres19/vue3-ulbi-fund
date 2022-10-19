<template>
  <div class="post-list">
    <template v-if="posts.length">
      <h3>Список постів:</h3>
      <transition-group name="post-list">
        <PostItem
          :post="post"
          v-for="post in posts"
          :key="post.id"
          @remove="$emit('remove', post)"
        />
      </transition-group>
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
.post-list-item {
  display: inline-block;
  margin-right: 10px;
}
.post-list-enter-active,
.post-list-leave-active {
  transition: all .5s ease;
}

.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.post-list-move {
  transition: transform 0.5s ease;
}
</style>