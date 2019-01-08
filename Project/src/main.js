import 'vuetify/dist/vuetify.min.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import { store } from './store/store'
// import VueBase64FileUpload from 'vue-base64-file-upload'

Vue.config.productionTip = false

Vue.use(Vuetify)
new Vue({
  store,
  router,
  // VueBase64FileUpload,
  render: h => h(App)
}).$mount('#app')
