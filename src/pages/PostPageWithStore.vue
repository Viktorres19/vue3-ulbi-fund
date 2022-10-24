<template>
  <div class="container">
<!--    learning examples-->
<!--    <h4>{{ $store.state.isAuth ? 'Користувач авторизован' : 'Авторизуйтесь, щоб користуватись додатком' }}</h4>
    <h2>likes: {{ $store.state.likes }}</h2>
    <h3>likes twice: {{ $store.getters.doubleLikes }}</h3>
    <div>
      <my-button @click="$store.commit('decrementLikes')">
        decrease likes
      </my-button>
      <my-button @click="$store.commit('incrementLikes')">
        increase likes
      </my-button>
    </div>-->
    <h1>Сторінка з постами</h1>
    <MyInput
      :model-value="searchQuery"
      @update:model-value="setSearchQuery"
      placeholder="Пошук постів..."
      v-focus
    />
    <div class="app-buttons">
      <my-button
        @click="showDialog"
      >
        Створити пост
      </my-button>
      <MySelect
        :model-value="selectedSort"
        @update:model-value="setSelectedSort"
        :options="sortOptions"
      />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <PostForm @create="createPost" />
    </my-dialog>
    <PostList
      :posts="sortedAndSearchedPosts"
      @remove="removePost"
      v-if="!isPostsLoading"
    />
    <svg v-if="isPostsLoading" xmlns="http://www.w3.org/2000/svg" style="margin:auto;background:0 0;display:block;shape-rendering:auto" width="200" height="200" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><g transform="matrix(.7 0 0 .7 15 15)"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" values="0 50 50;360 50 50" keyTimes="0;1" dur="4.166666666666666s"/><path fill-opacity=".8" fill="#e15b64" d="M50 50V0a50 50 0 0 1 50 50Z"/></g><g transform="matrix(.7 0 0 .7 15 15)"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" values="0 50 50;360 50 50" keyTimes="0;1" dur="5.5555555555555545s"/><path fill-opacity=".8" fill="#f47e60" d="M50 50h50a50 50 0 0 1-50 50Z"/></g><g transform="matrix(.7 0 0 .7 15 15)"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" values="0 50 50;360 50 50" keyTimes="0;1" dur="8.333333333333332s"/><path fill-opacity=".8" fill="#f8b26a" d="M50 50v50A50 50 0 0 1 0 50Z"/></g><g transform="matrix(.7 0 0 .7 15 15)"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" values="0 50 50;360 50 50" keyTimes="0;1" dur="16.666666666666664s"/><path fill-opacity=".8" fill="#abbd81" d="M50 50H0A50 50 0 0 1 50 0Z"/></g></svg>
<!--    <div ref="observer" class="observer"></div>-->
    <div v-intersection="loadMorePosts" class="observer"></div>
      <div class="page__wrapper">
        <button
          v-for="pageSwitcher in totalPages"
          :key="pageSwitcher"
          :class="{'current-page': page === pageSwitcher}"
          @click="switchPage(pageSwitcher)"
        >
          {{ pageSwitcher }}
        </button>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList';
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';
export default {
  name: 'PostPage',
  components: {PostList, PostForm},
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort',
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/fetchPosts'
    }),
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostsLoading: state => state.post.isPostsLoading,
      selectedSort: state => state.post.selectedSort,
      searchQuery: state => state.post.searchQuery,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
      sortOptions: state => state.post.sortOptions
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
    })
  },
}
</script>

<style>
.app-buttons {
  margin: 15px 0;
  padding: 15px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #c5ebf7;
}
.page__wrapper {
  padding: 15px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.page__wrapper button {
  border: 1px solid green;
  padding: 10px;
  background-color: white;
  color: green;
  white-space: nowrap;
  margin: 0 2px;
  transition: all .3s ease;
  cursor: pointer;
}
.page__wrapper .current-page {
  pointer-events: none;
  cursor: none;
  background-color: #c5ebf7;
  color: white;
}
.page__wrapper button:hover {
  background-color: #c5ebf7;
  color: white;
}
.observer {
  min-height: 30px;
  background-color: green;
}
</style>