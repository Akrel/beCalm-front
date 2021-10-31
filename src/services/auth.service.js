import api from "./api";
import TokenService from "../services/token.service";

class AuthService {
  login({ username, password }) {
    return api
      .post("/auth/signin", {
        username,
        password
      })
      .then((response) => {
        console.log("e " + response.data)
        if (response.data.accessToken) {
          TokenService.setUser(response.data);
        }

        console.log("response" + response.data.token);
        return response.data;
      });
  }

  logout() {
    return api.post("/auth/logout")
        .then((response) => {
          if(response.data.status === 200)
            TokenService.removeUser()
        })
  }

  register(User) {
    console.log(User);
    let promise1 = api.post("/auth/signup", User);
    promise1.then(r => console.log(r.status));
    return promise1;
  }
}

export default new AuthService();
