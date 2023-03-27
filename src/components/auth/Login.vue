<template>
  <div id="background-login">

    <div id="content">
      <div id="form">
        <div class="label-container">
          <div class="title-input">Nazwa użytkownika</div>
          <v-text-field
              v-model="username"
              :rules="[() => !!username || 'This field is required']"
              label="Username"
              required
              solo
              @blur="username.$touch()"
              @input="username.$touch()"
          ></v-text-field>
        </div>

        <div class="label-container">
          <div class="title-input">Hasło</div>
          <v-text-field
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[() => !!password || 'This field is required', rules.min]"
              :type="show1 ? 'text' : 'password'"
              hint="At least 8 characters"
              label="Password"
              name="input-10-1"
              solo
              @click:append="show1 = !show1"
          ></v-text-field>
        </div>


        <button id="button-register" type="button" v-on:click="login()">
          <v-icon style="margin-right: 3px"> mdi-lock-open</v-icon>
          Zaloguj się
        </button>

      </div>
    </div>
    <div id="right-panel">
      <v-btn id="back-login" @click="backregister">
        <v-icon left>
          mdi-arrow-left
        </v-icon>
        Zarejestruj się
      </v-btn>
    </div>
  </div>
</template>

<script>
import {email, maxLength, required} from "vuelidate/lib/validators";
import UserRequestLogin from "../../models/login-request";

export default {
  name: "Login",

  validations: {
    username: {required, maxLength: maxLength(10)},
    email: {required, email},
  },

  data: () => ({
    username: "wojtekgrelewicz",
    password: "qqqqqqqq",
    message: "",
    show1: false,

    rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters",
      emailMatch: () => `The email and password you entered don't match`
    }
  }),
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },

  methods: {
    login() {
      if (this.username && this.password) {
        let userRequest = new UserRequestLogin(this.username, this.password)
        this.$store
            .dispatch('auth/login', userRequest)
            .then((response) => {
                  if(response)
                  this.$router.push("/calendar")
                  this.$store.commit('loginSuccess', response);
                },

                error => {
                  this.message =
                      (error.response && error.response.data.message) ||
                      error.message ||
                      error.toString();
                }
            );
      }
    },

    backregister() {
      this.$router.push("register");
    }
  }
};
</script>

<style scoped>
#divider {
  align-items: center;
  margin-top: 20px;
  margin-bottom: 10px;
  color: black;
  font-size: 17px;
  font-weight: bold;
}

#background-login {
  display: flex;
  flex-direction: row;

  width: 100%;
  height: 100%;

  padding-left: 80px;
  background: url("../images/login-background.jpg") no-repeat;
  background-size: cover;
}

#content {
  order: 1;
  margin-left: auto;
  width: 35%;
  background-color: var(--login-background);
  height: 100%;
  float: right;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0 0 50px #2d2c2c;
}

#form {
  width: 65%;

  display: flex;
  flex-direction: column;
  margin-top: 40%;
  margin-left: auto;
  margin-right: auto;
}

#right-panel {
  order: 2;
  width: 200px;
  float: right;
}

.title-input {
  font-size: 15px;
  color: black;
  margin-top: 10px;
  padding-bottom: 5px;
}

#restart-password {
  font-size: 16px;
  float: right;
  margin-bottom: 10px;
}

.label-container {
  width: 100%;
  margin: auto;
}

.v-text-field >>> .v-messages__wrapper {
  margin-top: 4px;
  font-size: 11px;
}

#restart-password a {
  color: blue;
  text-decoration: underline;
  display: flex;
  flex-direction: row;
  float: right;
}

.v-text-field {
  border-radius: 10px;
}

#button-register {
  width: 90%;
  background-color: #3cbee5;
  margin: auto;
  border-radius: 10px;
  height: 40px;
}

#media {
  width: 80%;
  justify-content: space-between;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
}

#media >>> .v-btn {
  border-radius: 20px;
  margin-top: 2px;
}

#back-login {
  display: flex;
  width: 180px;
  background-color: white;
  border-radius: 20px;
  margin: 15px auto auto;
  color: black;
}

.v-text-field >>> .v-messages__wrapper {
  margin-top: 7px;
  font-size: 13px;
}

.dialogCss {
  background: #8e5ba6;
}

@media (max-width: 840px) {
  #form {
    flex-direction: column;
  }

  #media {
    flex-direction: column;
  }

  #media >>> v-btn {
    background-color: red;
  }
}
</style>
