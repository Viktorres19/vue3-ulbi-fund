<template>
  <div class="navbar">
    <div
      @click="$router.push('/')"
      style="color: white; font-size: 30px; text-transform: uppercase; font-weight: 700;"
    >
      Vue 3
    </div>
    <div class="navbar__btns">
      <my-button @click="$router.push('/posts')">Пости</my-button>
      <my-button @click="$router.push('/about')">Про сайт</my-button>
      <my-button @click="$router.push('/store')">Пости Vuex</my-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>
.navbar {
  min-height: 50px;
  padding: 10px 15px;
  background-color: teal;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>