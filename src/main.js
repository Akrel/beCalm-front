import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import vueAxios from "vue-axios";
import vuetify from "./plugins/vuetify";
import router from "./plugins/router";
import Vuelidate from "vuelidate/src";
import setupInterceptors from "./services/setupInterceptors";
import store from './modules';

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(vueAxios, axios);


setupInterceptors(store);
new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
