<template>
  <div id="background-login">
    <div id="content">
      <div id="register-form" >
        <div class="label-container">
          <div class="title-input">Email</div>
          <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            label="E-mail"
            required
            solo
          ></v-text-field>
        </div>

        <div id="name-container">
          <div class="title-input">Nazwa użytkownika</div>
          <v-text-field
            ref="username"
            v-model="username"
            :error-messages="errorMessages"
            :rules="[() => !!username || 'This field is required']"
            label="Username"
            required
            solo
          ></v-text-field>
        </div>

        <div id="name-surname-labels">
          <div id="name-container">
            <div class="title-input">Imie</div>
            <v-text-field
              ref="name"
              v-model="name"
              :error-messages="errorMessages"
              :rules="[() => !!name || 'This field is required']"
              label="Name"
              required
              solo
            ></v-text-field>
          </div>

          <div id="surname-container">
            <div class="title-input">Nazwisko</div>
            <v-text-field
              ref="surname"
              v-model="surname"
              :error-messages="errorMessages"
              :rules="[() => !!surname || 'This field is required']"
              label="Surname"
              required
              solo
            ></v-text-field>
          </div>
        </div>

        <div class="label-container">
          <div class="title-input">Hasło</div>
          <v-text-field
            v-model="password"
            :append-icon="pshow1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min, passwordMessages()]"
            :type="pshow1 ? 'text' : 'password'"
            hint="At least 8 characters"
            label="Password"
            name="input-10-1"
            required
            solo
            @click:append="pshow1 = !pshow1"
          ></v-text-field>
        </div>

        <div class="label-container">
          <div class="title-input">Powtórz hasło</div>
          <v-text-field
            v-model="repassword"
            :append-icon="pshow2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min, passwordMessages()]"
            :type="pshow2 ? 'text' : 'password'"
            hint="At least 8 characters"
            label="Password"
            name="input-10-1"
            required
            solo
            @click:append="pshow2 = !pshow2"
          ></v-text-field>
        </div>

        <p id="error" v-if="isRegistered === false">
          {{ errorMessages.toString() }}
        </p>
        <button id="button-register" type="button" v-on:click="submit()">
          <v-icon style="margin-right: 3px"> mdi-lock-open</v-icon>
          Utwórz konto
        </button>

      </div>
    </div>
    <div id="right-panel">
      <v-btn id="back-login" @click="backlogin">
        <v-icon left>
          mdi-arrow-left
        </v-icon>
        Zaloguj się
      </v-btn>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { email, maxLength, required } from "vuelidate/lib/validators";
import { mdiArrowLeft } from "@mdi/js";
import User from "../../models/user";

export default {
  name: "Register",
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required, email },
    password: { required },
    repassword: { required }
  },

  data: () => ({
    email: "wojtekgrelewicz@gmail.com",
    name: "wojtek",
    errorMessages: "",
    username: "wojtekgrelewicz",
    surname: "qqqq",
    password: "qqqqqqqq",
    repassword: "qqqqqqqq",
    isRegistered: null,
    pshow1: false,
    pshow2: false,

    rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters",
      emailMatch: () => `The email and password you entered don't match`
    },

    icons: {
      mdiArrowLeft
    }
  }),

  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    passwordMessages() {
      return () =>
        this.password === this.repassword ||
        "Your password and confirmation password do not match.";
    }
  },

  methods: {
    register() {
      this.$router.push("register");
    },
    backlogin() {
      this.$router.push("/login");
    },
    submit() {
      let user = new User(
        this.username,
        this.email,
        this.password,
        this.name,
        this.surname
      );
      this.$store.dispatch("auth/register", user).then(
        data => {
          console.log(data.message);
          this.errorMessages = data.message;
          this.isRegistered = true;
          this.$router.push("log");
        },
        error => {
          this.errorMessages =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.isRegistered = false;
        }
      );
      console.log("dsa");
    }
  },
  watch: {
    email: function(val) {
      console.log(email);
      this.username = val.substring(0, val.indexOf("@"));
    }
  }
};
</script>

<style scoped>
* {
  overflow: none;
}

#divider {
  align-items: center;
  margin-top: 10px;
  color: black;
  font-size: 17px;
  font-weight: bold;
}

#error {
  background-color: transparent;
  color: red;
}

#background-login {
  display: flex;
  flex-direction: row;
  float: right;
  width: 100%;
  height: 100%;
  padding-left: 80px;
  background: url("../images/login-background.jpg") no-repeat;
  background-size: cover;
  overflow: hidden;
}

#right-panel {
  order: 2;
  width: 200px;
  float: right;
}

#content {
  width: 35%;
  margin-left: auto;
  order: 1;
  background-color: var(--login-background);
  height: 100%;
  float: right;
  border-radius: 5px;
  box-shadow: 0 0 50px #2d2c2c;
}

#register-form {
  width: 70%;
  display: flex;
  flex-direction: column;
  margin-top: 30%;
  margin-left: auto;
  margin-right: auto;
}

.title-input {
  font-size: 15px;
  color: black;
  margin-top: 1px;
  padding-bottom: 1px;
}

.v-text-field >>> .v-messages__wrapper {
  margin-top: 7px;
  font-size: 13px;
}

#name-surname-labels {
  display: flex;
  flex-direction: row;
}

#button-register {
  width: 60%;

  background-color: var(--blue-light);
  border-radius: 10px;
  margin: auto;
  font-size: 18px;
  height: 40px;
  margin-top: 5px;
}

.v-text-field >>> .v-input__slot {
  margin-bottom: 0;
  padding-left: 2px;
  padding-right: 2px;
}

.v-text-field.v-text-field--solo >>> .v-input__control {
  min-height: 40px !important;
}

.v-text-field >>> .v-text-field--enclosed >>> .v-text-field__details {
  margin-bottom: 0;
}

#media {
  display: flex;
  flex-direction: row;
}

#media >>> .v-btn {
  margin-top: 20px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  border-radius: 50px;
  background-color: #8e5ba6;
  height: 45px;
}

#surname-container {
  margin-left: auto;
}

.dialogCss {
  background: #8e5ba6;
}

#back-login {
  display: flex;
  width: 180px;
  background-color: white;
  border-radius: 20px;
  margin: 15px auto auto;
  color: black;
}

#back-login >>> v-btn {
  border-radius: 20px;
}

@media (max-width: 840px) {
  #register-form {
    flex-direction: column;
  }

  #media {
    flex-direction: column;
  }

  #name-surname-labels {
    flex-direction: column;
  }

  #media >>> v-btn {
    background-color: red;
  }
}
</style>
