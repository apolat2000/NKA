<template>
  <div id="register">
    <h1 class="pt-12 pb-4 text-white text-center">Register</h1>
    <reg-form />
  </div>
</template>

<script>
import RegForm from '../components/auth/RegForm.vue';
export default {
  name: "Login",
  components: { RegForm },
  created() {
    //user is not authorized => Remain at login page
    if (localStorage.getItem("jwt_token") !== null) {
      this.$router.push("/");
    }
  },
};
</script>