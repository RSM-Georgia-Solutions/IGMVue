import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
// import * as Cookies from 'js-cookie'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    baseUrl: 'https://localhost:44315/api',
    baseUrlImage: 'https://localhost:44315/',
    baseUrlImageTmp: 'http://192.168.7.247:8000/',
    baseUrlTmp: 'http://192.168.7.247:8000/api',
    counter: 0
  },
  plugins: [
    createPersistedState({
      token: ''
    })
  ]
})
