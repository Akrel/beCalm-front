import Vue from 'vue'
import App from './App.vue'
import store from './store';
import axios from "axios";
import vueAxios from 'vue-axios'
import vuetify from './plugins/vuetify'
import router from './plugins/router'
import Vuelidate from "vuelidate/src";
Vue.config.productionTip = false
Vue.use(Vuelidate);
Vue.use(vueAxios,axios)
new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
