<template>
  <div>
    <img
      src="../../assets/navlogo.png"
    />
    <div>
      <h1>Forgot Your Password</h1>
      <p>
        We get it, stuff happens. Just enter your email address below and we'll
        send you a link to reset your password!
      </p>
      <i-form @submit.prevent="handleSubmit" method="POST">
        <i-input
          type="email"
          name="email"
          id="email"
          v-model="email"
          placeholder="E-Mail"
          required
        />
        <i-input
          type="submit"
          id="submitButton"
          value="Reset Password"
        />
      </i-form>
      <div class="text-center">
        <router-link
          to="register"
          >Create an Account!</router-link
        >
      </div>
      <div class="text-center">
        <router-link
          to="login"
          >Already have an account? Login!</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "Forgot",
  data() {
    return {
      email: "",
    };
  },
  methods: {
    handleSubmit: async function forgotPassword() {
      let submitButton = document.getElementById("submitButton");
      submitButton.disabled = true;
      try {
        const res = await axios.post(
          "http://localhost:3000/forgotPassowrd",
          { email: this.email }
        );
        if (res.status === 200) {
          window.alert("Reset E-Mail was sent successfully");
          this.$router.push("/");
        }
      } catch (e) {
        window.alert(
          "Request could not be completed. Please try again later. Error: " +
            e.message
        );
      }
    },
  },
};
</script>
