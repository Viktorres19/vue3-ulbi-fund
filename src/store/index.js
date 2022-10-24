import {createStore} from 'vuex';
import {postModule} from "./postModule";

export default createStore({
  state: {
    isAuth: false,
  },
  modules: {
    post: postModule
  }
  /*Learning examples*/
  /*state: {
    likes: 1,
    isAuth: false,
  },
  getters: {
    doubleLikes(state) {
      return state.likes * 2
    }
  },
  mutations: {
    incrementLikes(state) {
      if (state.likes < 10) {
        state.likes += 1
      }
    },
    decrementLikes(state) {
      if (state.likes > 0) {
        state.likes -= 1
      }
    },
  },
  actions: {

  },*/
})