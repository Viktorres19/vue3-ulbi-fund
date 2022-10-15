<template>
  <div class="post">
    <div>
      <div><strong>Назва: </strong>{{ post.title }}</div>
      <div><strong>Опис: </strong>{{ post.description }}</div>
    </div>
    <my-button>
      Видалити пост
    </my-button>
  </div>
</template>

<script>
import MyButton from '@/components/UI/MyButton';
export default {
  name: "PostItem",
  components: { MyButton },
  data() {
    return {
      buttonText: 'Створити запис'
    }
  },
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
</style>