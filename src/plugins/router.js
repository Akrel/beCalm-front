import Vue from "vue";
import VueRouter from "vue-router";
import Register from "@/components/auth/Register";
import Login from "@/components/auth/Login";
import MainView from "../components/MainView";

Vue.use(VueRouter);
Vue.component("register", Register);
Vue.component("login", Login);
Vue.component("mainView", MainView);

/*const loggedInGuard = (to, from, next) => {
    if (sessionStorage.getItem('loggedIn'))
        next();
    else
        next('/')
}*/

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../components/auth/Login")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../components/auth/Register")
  },

  {
    path: "/",
    name: "mainViw",
    component: () => import("../components/MainView")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
