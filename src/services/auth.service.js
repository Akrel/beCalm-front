import api from "./api";
import TokenService from "../services/token.service";
import endpoint from "../endpoint.json";
class AuthService {
  login({ username, password }) {
    return api
      .post("/auth/signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) TokenService.setUser(response.data);

        return response.data;
      });
  }

  logout() {
    TokenService.removeUser();
  }

  register(User) {
    console.log(User);
    return api.post(`${endpoint.url}/auth/signup`, User);
  }
}
export default new AuthService();
