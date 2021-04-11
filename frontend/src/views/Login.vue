<template>
  <div
    id="login"
  >
    <div>
      <h1 class="_text-center">Login</h1>
      <login-form />
    </div>
  </div>
</template>

<script>
import LoginForm from "../components/auth/LoginForm.vue";
export default {
  name: "Login",
  components: { LoginForm },
  created() {
    //user is not authorized => Remain at login page
    if (localStorage.getItem("jwt_token") !== null) {
      this.$router.push("/");
    }
  },
};
</script>