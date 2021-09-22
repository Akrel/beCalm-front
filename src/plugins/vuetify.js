import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import colors from "vuetify/lib/util/colors";
import MenuIcon from "vue-material-design-icons/Menu.vue";
Vue.use(Vuetify);
Vue.component("menu-icon", MenuIcon);
export default new Vuetify({
  theme: {
    themes: {
      primary: colors.lightBlue.accent3
    }
  }
});
