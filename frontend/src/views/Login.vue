<template>
  <div
    id="login"
    class="_margin-top-2"
  >
    <div class="_display-flex _flex-direction-column _align-items-center">
      <img src="../assets/lightning.png" width="50px;" alt="">
      <h1 class="_text-center">Login to NKA</h1>
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