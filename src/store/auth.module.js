import AuthService from "../services/auth.service"

const user = JSON.parse(localStorage.getItem('user'));

const stateInit = user ? {status: {loggedIn: true}, user}
    : {status: {loggedIn: false}, user: null};


export const auth = {
    namespaced: true,
    state: stateInit,
    actions: {

        login({commit}, user) {
            return AuthService.login(user).then(
                user => {
                    commit('loginSuccess', user);
                    return Promise.resolve(user)
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },

        register({commit}, user) {
            return AuthService.register(user).then(
                response => {
                    commit('registerSuccess');
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('registerFailure');
                    return Promise.reject(error);
                }
            )
        },

        refreshToken({commit}, accessToken) {
            commit('refreshToken', accessToken);
        }
    },

    mutations: {

        refreshToken(state, accessToken) {
            state.status.loggedIn = true;
            state.user = {...state.user, accessToken: accessToken}
        },

        loginSuccess(state, user) {
            state.user.loggedIn = true;
            state.user = user;
        },

        loginFailure(state) {
            state.status.loggedIn = false;
            status.user = null;
        },

        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
        },

        registerSuccess(state) {
            state.status.logggIn = false;
        },

        registerFailure(state) {
            state.status.loggedIn = false;
        }
    }
}

