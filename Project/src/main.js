import "vuetify/dist/vuetify.min.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuetify from "vuetify";
import VueAxios from "vue-axios";
import axios from "axios";
import JsonExcel from "vue-json-excel";
import { store } from "./store/store";

Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.use(VueAxios, axios);
Vue.use(require("vue-moment"));
Vue.directive("scroll", {
  inserted: function(el, binding) {
    let f = function(evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener("scroll", f);
      }
    };
    window.addEventListener("scroll", f);
  }
});
Vue.axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent

    if (
      localStorage.token === "" ||
      localStorage.token === "undefined" ||
      localStorage.token == null
    ) {
      router.push({
        name: "Login"
      });
    }
    config.headers = {
      Authorization: "Bearer " + localStorage.token
    };
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data

    return response;
  },
  function(error) {
    // Do something with response error
    if (error.response.status === 401) {
      // console.log('Back To Login')
      store.state.UrlRedirect = router.history.current.path;
      // console.log(router.history.current.path)
      router.push({
        name: "Login"
      });
    } else if (error.response.status === 403) {
      // console.log('Back Previous Route')
      router.go(-1);
    }
    return Promise.reject(error);
  }
);

new Vue({
  store,
  router,
  components: {
    downloadExcel: JsonExcel
  },
  render: h => h(App)
}).$mount("#app");
