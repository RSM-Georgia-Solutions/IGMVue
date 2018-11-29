import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
// import * as Cookies from 'js-cookie'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    token: '',
    baseUrl: 'https://localhost:44317/api',
    counter: 0
  },
  plugins: [
    createPersistedState()
  ],
  mutations: {
    increment: state => state.token++
  }
})
