<template>
  <div>
    <img
      src="../../assets/navlogo.png"
    />
    <div>
      <h1>Reset Your Password</h1>
      <i-form @submit.prevent="handleSubmit" method="POST">
        <i-input
          type="password"
          name="password"
          id="password"
          v-model="password"
          placeholder="Password"
          required
        />
        <i-input
          type="password"
          name="password"
          id="password_confirm"
          v-model="password_confirm"
          placeholder="Confirm your passowrd"
          required
        />
        <i-input
          type="submit"
          id="submitButton"
          value="Change Password"
        />
      </i-form>
      <br />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "Forgot",
  data() {
    return {
      password: "",
      password_confirm: "",
    };
  },
  async mounted() {
    try {
      localStorage.clear();
      this.$root.$refs.Navbar.reloadNav();
      const jwt_token = this.$route.params.token;
      if (jwt_token) {
        let result = await axios.post(
          "http://localhost:3000/verifyTokenSalt",
          {},
          {
            headers: {
              Authorization: `Bearer ${jwt_token}`,
            },
          }
        );
        if (result.status === 200) {
          console.log("Token valid");
        }
      }
    } catch (err) {
      console.log(err.message);
      localStorage.clear();
      this.$router.push("/login");
      this.$root.$refs.Navbar.reloadNav();
      console.log("Invalid Token");
    }
  },
  methods: {
    handleSubmit: async function changePassowrd() {
      if (this.password === this.password_confirm) {
        let submitButton = document.getElementById("submitButton");
        submitButton.disabled = true;
        submitButton.className =
          "w-full px-4 py-2 font-bold text-black bg-grey-500 rounded-full hover:bg-grey-700 focus:outline-none focus:shadow-outline";
        try {
          const res = await axios.post(
            "http://localhost:3000/updatePassword",
            {
              password: this.password,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$route.params.token}`,
              },
            }
          );
          if (res.status === 200) {
            window.alert("Passowrd Successfully Updated!");
            this.$router.push("/login");
          }
        } catch (e) {
          window.alert(
            "Request could not be completed. Please try again later. Error: " +
              e.message
          );
        }
      } else {
        window.alert("Passowrds do not match!");
      }
    },
  },
};
</script>
