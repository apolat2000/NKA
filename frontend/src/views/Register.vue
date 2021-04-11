<template>
  <div
    id="login"
  >
    <div>
      <h1 class="_text-center">Register</h1>
      <reg-form />
    </div>
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