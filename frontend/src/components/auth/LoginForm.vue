<template>
  <i-container>
    <i-row>
      <i-column
        xl="6"
        lg="8"
        md="10"
        sm="12"
        xs="12"
        class="_margin-x-auto _margin-bottom-1"
      >
        <i-alert variant="warning" :show="showAlert">
          <p>{{ alertMessage }}</p>
        </i-alert>
      </i-column>
    </i-row>

    <i-row>
      <i-column
        xl="4"
        lg="6"
        md="6"
        sm="8"
        xs="12"
        class="_margin-x-auto _background-gray-20 _padding-1"
      >
        <i-form method="POST">
          <i-form-group>
            <i-input placeholder="Email" v-model="email" type="email" />
          </i-form-group>

          <i-form-group>
            
            <i-input placeholder="Password" v-model="password" type="password" />
            <router-link class="_margin-y-1-4 _float-right" :to="{ name: 'forgot'}"><p style="width: 15ch">Forgot password?</p></router-link>
          </i-form-group>
          <i-form-group>
            <i-button class="_width-100" variant="primary" @click="handleSubmit" type="submit">Login</i-button>
          </i-form-group>
        </i-form>
      </i-column>
    </i-row>

    <i-row>
      <i-column
        xl="4"
        lg="6"
        md="6"
        sm="8"
        xs="12"
        class="_margin-x-auto _background-gray-20 _padding-1 _margin-top-1"
      >
        <p>New around here? <router-link :to="{name: 'register'}">Create an account.</router-link></p>
      </i-column>
    </i-row>
  </i-container>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginForm",
  data() {
    return {
      showAlert: false,
      email: "",
      password: "",
      jwt_token: "",
      alertMessage: "",
    };
  },
  methods: {
    handleSubmit: async function login() {
      if (this.email === "") {
        this.alertMessage =
          "Please type in your email address that you once used to register.";
        this.showAlert = true;
      } else if (this.password === "") {
        this.alertMessage =
          "Please type in your password that you once used to register.";
        this.showAlert = true;
      } else
        try {
          let user = {
            email: this.email,
            password: this.password,
          };
          var res = await axios.post("http://localhost:3000/login", user);
          //if successfull
          if (res.status === 200) {
            console.log("Logged in");
            console.log(res.data);
            localStorage.setItem("jwt_token", res.data.jwt_token);
            localStorage.setItem("userID", res.data.userID);
            localStorage.setItem("firstName", res.data.first_name);
            localStorage.setItem("img_path", res.data.img_path);
            this.$router.push("/");
            this.$root.$refs.Navbar.reloadNav();
          }
        } catch (err) {
          if (err.response.status) {
            this.alertMessage =
              "We don't seem to have the credentials you typed in as a registered user. Please double-check and try again.";
            this.showAlert = false;
            this.showAlert = true;
          }
        }
      return false;
    },
  },
};
</script>