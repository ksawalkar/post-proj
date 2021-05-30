import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import Paginate from "vuejs-paginate";
import vuetify from "./plugins/vuetify";
Vue.component("paginate", Paginate);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
