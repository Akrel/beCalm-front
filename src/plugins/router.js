import Vue from "vue";
import VueRouter from "vue-router";
import Register from "@/components/auth/Register";
import Login from "../components/auth/Login";
import MainView from "../components/mainView/MainView";
import ToDo from "../components/Todo"
Vue.use(VueRouter);
Vue.component("register", Register);
Vue.component("login", Login);
Vue.component("mainView", MainView);
Vue.component("ToDo", ToDo);

const loggedInGuard = (to, from, next) => {
  if (localStorage.getItem("user")) {
    next();
  } else {
    next("/login");
  }
};

const notLoggedInGuard = (to, from, next) => {
  if (localStorage.getItem("user")) {
    next("/");
  } else {
    next();
  }
};

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../components/auth/Login"),
    beforeEnter: notLoggedInGuard
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../components/auth/Register"),
    beforeEnter: notLoggedInGuard
  },
  {
    path: "/toDo",
    name: "todo",
    component: () => import("../components/Todo"),
    beforeEnter: loggedInGuard
  },


  {
    path: "/",
    name: "mainView",
    component: () => import("../components/mainView/MainView"),
    beforeEnter: loggedInGuard
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,

  routes
});

export default router;
