<template>
  <div class="container">
    <h1>Сторінка з постами</h1>
    <MyInput
      @input="changeSearchQuery"
      placeholder="Пошук постів..."
    />
    <div class="app-buttons">
      <my-button
        @click="showDialog"
      >
        Створити пост
      </my-button>
      <MySelect
        v-model="selectedSort"
        :options="sortOptions"
      />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <PostForm @create="create" />
    </my-dialog>
    <PostList
      :posts="sortedAndSearchedPosts"
      @remove="removePost"
      v-if="!isPostsLoading"
    />
    <svg v-if="isPostsLoading" xmlns="http://www.w3.org/2000/svg" style="margin:auto;background:0 0;display:block;shape-rendering:auto" width="200" height="200" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><g transform="matrix(.7 0 0 .7 15 15)"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" values="0 50 50;360 50 50" keyTimes="0;1" dur="4.166666666666666s"/><path fill-opacity=".8" fill="#e15b64" d="M50 50V0a50 50 0 0 1 50 50Z"/></g><g transform="matrix(.7 0 0 .7 15 15)"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" values="0 50 50;360 50 50" keyTimes="0;1" dur="5.5555555555555545s"/><path fill-opacity=".8" fill="#f47e60" d="M50 50h50a50 50 0 0 1-50 50Z"/></g><g transform="matrix(.7 0 0 .7 15 15)"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" values="0 50 50;360 50 50" keyTimes="0;1" dur="8.333333333333332s"/><path fill-opacity=".8" fill="#f8b26a" d="M50 50v50A50 50 0 0 1 0 50Z"/></g><g transform="matrix(.7 0 0 .7 15 15)"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" values="0 50 50;360 50 50" keyTimes="0;1" dur="16.666666666666664s"/><path fill-opacity=".8" fill="#abbd81" d="M50 50H0A50 50 0 0 1 50 0Z"/></g></svg>
    <div ref="observer" class="observer"></div>
    <!--    <div class="page__wrapper">
          <button
            v-for="pageSwitcher in totalPages"
            :key="pageSwitcher"
            :class="{'current-page': page === pageSwitcher}"
            @click="switchPage(pageSwitcher)"
          >
            {{ pageSwitcher }}
          </button>
        </div>-->
  </div>
</template>

<script>
import axios from 'axios';
import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList';

export default {
  name: 'PostPage',
  components: {PostList, PostForm},
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: '',
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        {value: 'title', name: 'Назві'},
        {value: 'body', name: 'Вмісту'}
      ]
    }
  },
  methods: {
    changeSearchQuery(e) {
      this.searchQuery = e.target.value;
    },
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
        this.isPostsLoading = true;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = response.data;
      } catch (e) {
        alert('Помилка')
      } finally {
        this.isPostsLoading = false;
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        alert('Помилка')
      }
    },
    /*switchPage(pageSwitcher) {
      this.page = pageSwitcher;
    },*/
  },
  watch: {
    /*page() {
      this.fetchPosts();
    }*/
  },
  mounted() {
    this.fetchPosts();
    console.log(this.$refs.observer);
    const options = {
      rootMargin: '0px',
      threshold: 1.0
    }
    const callback = (entries, observer) => {
      if (entries[0].isIntersecting && this.page < this.totalPages) {
        this.loadMorePosts()
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer);
  },
  /*watch: {
    selectedSort(newValue) {
      this.posts.sort((post1, post2) => {
        return post1[newValue]?.localeCompare(post2[newValue])
      })
    }
  },*/
  // sort using computed
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
    },
    sortedAndSearchedPosts() {
      console.log(this.searchQuery);
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
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