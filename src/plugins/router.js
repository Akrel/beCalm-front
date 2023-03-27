import Vue from "vue";
import VueRouter from "vue-router";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import MainView from "../components/mainView/MainView";
import Calendar from "../components/activity/Calendar";
import TodoList from "../components/toDoList/TodoList";

Vue.use(VueRouter);
Vue.component("register", Register);
Vue.component("login", Login);
Vue.component("mainView", MainView);
Vue.component("TodoList", TodoList);

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
    component: Login,
    beforeEnter: notLoggedInGuard
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../components/auth/Register"),
    beforeEnter: notLoggedInGuard
  },

  {
    path: "/",
    redirect: '/calendar',
    name: "mainView",
    component: MainView,
    beforeEnter: loggedInGuard,
    children: [
      {
        path: "/calendar",
        component: Calendar,
        beforeEnter: loggedInGuard
      },
      {
        path: "/todoList/:filter",
        component: TodoList,
        props: true,
        beforeEach(to, from, next) {
          if (
            ["all", "active", "completed"].some(
              record => record === to.params.filter
            )
          ) {
            next();
          } else {
            next("/all");
          }
        },

        beforeEnter: loggedInGuard
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
