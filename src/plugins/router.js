import Vue from 'vue';
import VueRouter from 'vue-router';
import Register from "@/components/auth/Register";
import Login from "@/components/auth/Login";



Vue.use(VueRouter);
Vue.component('register', Register)
Vue.component('login', Login)


/*const loggedInGuard = (to, from, next) => {
    if (sessionStorage.getItem('loggedIn'))
        next();
    else
        next('/')
}*/


const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import('../components/auth/Login'),

    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../components/auth/Register'),
    }


]


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
