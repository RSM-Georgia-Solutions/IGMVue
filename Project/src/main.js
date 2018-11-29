import 'vuetify/dist/vuetify.min.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import { store } from './store/store'

Vue.config.productionTip = false
Vue.use(Vuetify)
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
