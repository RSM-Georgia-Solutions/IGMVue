import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
// import * as Cookies from 'js-cookie'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    baseUrl: 'https://localhost:44315/api',
    baseUrlImage: 'https://localhost:44315/',
    // baseUrlImage: 'http://94.43.170.68:8000/',
    // baseUrl: 'http://94.43.170.68:8000/api',
    // baseUrl: 'http://146.255.241.242:8001/api',
    // baseUrlImage: 'http://146.255.241.242:8001/',
    // baseUrl: 'http://192.168.7.247:8000/api',
    // baseUrlImage: 'http://192.168.7.247:8000/',
    UrlRedirect: ''
  },
  plugins: [
    createPersistedState({
      token: ''
    })
  ]
})
