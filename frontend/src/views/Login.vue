<template>
  <div
    id="login"
    class="h-full grid justify-items-center items-center grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1"
  >
    <div class="flex flex-col w-full">
      <h1 class="text-white text-center">Login</h1>
      <login-form />
    </div>
    <img src="../assets/emptyphone.png" class="w-full md:w-3/4" />
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