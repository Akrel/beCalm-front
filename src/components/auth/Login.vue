<template>
  <div id="background-login">
    <div id="content">
      <form id="form">


        <div class="label-container">
          <div class="title-input">Email</div>
          <v-text-field
              v-model="email"
              :error-messages="emailErrors"
              label="E-mail"
              required
              solo
              @blur="$v.email.$touch()"
              @input="$v.email.$touch()"
          ></v-text-field>
        </div>

        <div class="label-container">
          <div class="title-input">Password</div>
          <v-text-field
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
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


        <v-btn

            id="button-login"

            @click="submit"
        >
          <v-icon style="margin-right: 3px"> mdi-lock-open</v-icon>
          submit
        </v-btn>

        <v-row id="divider">
          <v-divider></v-divider>
          Or
          <v-divider></v-divider>
        </v-row>
        <div id="media">
          <v-btn
              active-class="button-media"
              class="verilog dialogCss"
              @click="submit">
            submit
          </v-btn>

        </div>
      </form>

    </div>
    <div id="right-panel">
      <v-btn
          id="back-login"

          @click="backregister">
        <v-icon left>
          mdi-arrow-left
        </v-icon>
        Sign Up
      </v-btn>

    </div>
  </div>

</template>

<script>
import {validationMixin} from 'vuelidate'
import {email, maxLength, required} from 'vuelidate/lib/validators'


export default {
  name: "Login",
  mixins: [validationMixin],

  validations: {
    name: {required, maxLength: maxLength(10)},
    email: {required, email},
    select: {required},
    checkbox: {
      checked(val) {
        return val
      },
    },
  },

  data: () => ({
    email: '',
    password: 'Password',
    show1: false,
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters',
      emailMatch: () => (`The email and password you entered don't match`),
    },
  }),

  computed: {
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
  },

  methods: {
    register() {
      this.$router.push('register')
    },
    submit() {
      this.$router.push('register')
    },

    backregister() {
      this.$router.push("register")
    },

    clear() {
      this.$v.$reset()
      this.name = ''
      this.email = ''
      this.select = null
      this.checkbox = false
    },
  },
}
</script>

<style scoped>

#divider {
  align-items: center;
  margin-top: 10px;
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
  margin-top: 35%;
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
  margin-top: 20px;
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
  font-size: 15px;

}

#restart-password a {
  color: blue;
  display: flex;
  margin: auto;
  flex-direction: row;
  float: right;
}

.v-text-field {
  border-radius: 10px;
}

#button-login {
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
  margin-top: 20px;

  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
}

#media >>> .v-btn {
  border-radius: 20px;
}

#back-login {
  display: flex;
  width: 110px;
  background-color: var(--blue-light);
  border-radius: 20px;
  margin: 15px auto auto;
  color: white;
}

#media-btn1 {
  float: right;
  margin-top: 20px;
}

.dialogCss {
  background: #8e5ba6;
}

@media (max-width: 840px) {
  #form {
    flex-direction: column
  }

  #media {
    flex-direction: column;
  }

  #media >>> v-btn {
    background-color: red;
  }
}


</style>



