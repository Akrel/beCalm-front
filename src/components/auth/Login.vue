<template>
  <div id="background-login">
    <div id="content">
      <form id="form" @submit="login">
        <div class="label-container">
          <div class="title-input">Username</div>
          <v-text-field
            v-model="username"
            label="Username"
            :rules="[() => !!username || 'This field is required']"
            required
            solo
            @blur="$v.username.$touch()"
            @input="$v.username.$touch()"
          ></v-text-field>
        </div>

        <div class="label-container">
          <div class="title-input">Password</div>
          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[() => !!password || 'This field is required', rules.min]"
            :type="show1 ? 'text' : 'password'"
            hint="At least 8 characters"
            label="Normal with hint text"
            name="input-10-1"
            solo
            @click:append="show1 = !show1"
          ></v-text-field>
        </div>

        <div id="restart-password">
          <a> Restart password</a>
        </div>

        <v-btn id="button-register" type="submitbt">
          <v-icon style="margin-right: 3px"> mdi-lock-open</v-icon>
          submit
        </v-btn>

        <v-row id="divider">
          <v-divider></v-divider>
          Or
          <v-divider></v-divider>
        </v-row>
        <div id="media">
          <v-btn active-class="button-media" class="verilog dialogCss">
            submit
          </v-btn>
        </div>
      </form>
    </div>
    <div id="right-panel">
      <v-btn id="back-login" @click="backregister">
        <v-icon left>
          mdi-arrow-left
        </v-icon>
        Sign Up
      </v-btn>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { email, maxLength, required } from "vuelidate/lib/validators";

export default {
  name: "Login",
  mixins: [validationMixin],

  validations: {
    username: { required, maxLength: maxLength(10) },
    email: { required, email },
    select: { required },
    checkbox: {
      checked(val) {
        return val;
      }
    }
  },

  data: () => ({
    username: "qww",
    password: "qqqqqqqq",
    show1: false,

    rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters",
      emailMatch: () => `The email and password you entered don't match`
    }
  }),

  methods: {
    login() {
      console.log(this.username + " " + this.password);
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
  width: 150px;
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
  width: 110px;
  background-color: var(--blue-light);
  border-radius: 20px;
  margin: 15px auto auto;
  color: white;
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
