import api from "./api";
import TokenService from "../services/token.service";
const setup = store => {
    api.interceptors.request.use(
        config => {
            const token = TokenService.getLocalAccessToken();

            if (token) {
                config.headers["Authorization"] = "Bearer " + token;
            }
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    api.interceptors.response.use(
        res => {
            return res;
        },
        async err => {
            const originalConfig = err.config;
            if (originalConfig.url !== "/auth/signin" && err.response) {
                console.log(err.response);
                if (err.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;
                    try {
                        const rs = await api.post("/auth/refreshtoken", {
                            refreshToken: TokenService.getLocalRefreshToken(),
                        });
                        const {accessToken} = rs.data;
                        store.dispatch("auth/refreshToken", accessToken);
                        TokenService.updateLocalAccessToken(accessToken);

                        return api(originalConfig);
                    } catch (_error) {
                        return Promise.reject(_error);
                    }
                }

            }

            return Promise.reject(err);
        }
    );
};

export default setup;

