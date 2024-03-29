import api from "./api";
import TokenService from "../services/token.service";

class AuthService {
    login({username, password}) {
        return api.post("/auth/signin", {
                username,
                password
            })
            .then((response) => {

                if (response.data.token) {
                    TokenService.setUser(response.data);
                }

                console.log("response" + response.data.token);
                return response.data;
            })
            .catch(err => console.error("error" + err));
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(User) {
        console.log(User);
        let promise1 = api.post("/auth/signup", User);
        promise1.then(r => console.log(r.status));
        return promise1;
    }
}

export default new AuthService();
