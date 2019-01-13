import 'vuetify/dist/vuetify.min.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import VueAxios from 'vue-axios'
import axios from 'axios'

import { store } from './store/store'
// import VueBase64FileUpload from 'vue-base64-file-upload'

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(VueAxios, axios)

Vue.axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers = {
    Authorization: 'Bearer ' + localStorage.token
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

new Vue({
  store,
  router,
  // VueBase64FileUpload,
  render: h => h(App)
}).$mount('#app')
