import Vue from "vue";
import VueRouter from "vue-router";
import Register from "@/components/auth/Register";
import Login from "../components/auth/Login";
import MainView from "../components/mainView/MainView";
import Calendar from "../components/activity/Calendar";
import ToDoList from "../components/toDo/Todo";

Vue.use(VueRouter);
Vue.component("register", Register);
Vue.component("login", Login);
Vue.component("mainView", MainView);
Vue.component("ToDo", ToDoList);

/*const loggedInGuard = (to, from, next) => {
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
};*/

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../components/auth/Login")
    // beforeEnter: notLoggedInGuard
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../components/auth/Register")
    // beforeEnter: notLoggedInGuard
  },

  {
    path: "/",
    name: "mainView",
    component: () => import("../components/mainView/MainView"),
    // beforeEnter: loggedInGuard,
    redirect: "/calendar",
    children: [
      {
        path: "/calendar",
        component: Calendar
        // beforeEnter: loggedInGuard,
      },
      {
        path: "/toList",
        component: ToDoList
        // beforeEnter: loggedInGuard,
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,

  routes
});

export default router;
