<template>
  <i-container>
    <i-row>
      <i-column xl="6" lg="8" md="10" sm="12" xs="12" class="_margin-x-auto _margin-bottom-1"
        ><i-alert variant="warning" :show="showAlert">
          <p>{{ alertMessage }}</p>
        </i-alert></i-column
      >
    </i-row>

    <i-row>
      <i-column xl="4" lg="6" md="6" sm="8" xs="12" class="_margin-x-auto _background-gray-20 _padding-1">
        <form @submit.prevent="handleSubmit" method="POST">
          <i-form-group>
            <i-form-label>Email</i-form-label>
            <i-input v-model="email" type="email" />
          </i-form-group>

          <i-form-group>
            <i-form-label>Password</i-form-label>
            <i-input v-model="password" type="password" />
          </i-form-group>
          <i-form-group>
            <i-button variant="primary" type="submit">Button</i-button>
          </i-form-group>
        </form>
      </i-column>
    </i-row>
  </i-container>
  <!-- 
  <div class="flex flex-col justify-center">
    <t-alert
      variant="danger"
      class="w-4/5 block self-center mb-8"
      :show="showAlert"
      >{{ alertMessage }}</t-alert
    >
    <div class="self-center w-4/5 md:w-3/5 md:mt-0 md:col-span-2">
      <form @submit.prevent="handleSubmit" method="POST">
        <div class="shadow bg-indigo-800 overflow-hidden sm:rounded-md">
          <div class="px-4 py-5 sm:p-6">
            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6">
                <label
                  for="email"
                  class="font-bold font-lato block text-m text-white"
                  >Email</label
                >
                <t-input id="email" v-model="email" type="email" />
              </div>

              <div class="col-span-6">
                <label
                  for="password"
                  class="font-semibold block text-m text-white"
                  >Password</label
                >
                <t-input id="password" v-model="password" type="password" />
              </div>
            </div>
          </div>
          <div class="px-2 pt-3 pb-8 flex sm:px-6">
            <t-button type="submit" class="flex-1 mr-4"
              ><i class="sign in icon"></i>Login</t-button
            >
            <t-button class="ml-8"
              ><i class="question circle icon"></i>Forgot my password</t-button
            >
          </div>
        </div>
      </form>
    </div>
  </div> -->
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
            localStorage.setItem("jwt_token", res.data.jwt_token);
            localStorage.setItem("userID", res.data.userID);
            localStorage.setItem("firstName", res.data.first_name);
            this.$router.push("/");
            this.$root.$refs.Navbar.reloadNav();
          }
        } catch (err) {
          if (err.response.status) {
            this.alertMessage =
              "We don't seem to have the credentials you typed in as a registered user. Please double-check and try again.";
            this.showAlert = true;
          }
        }
      return false;
    },
  },
};
</script>