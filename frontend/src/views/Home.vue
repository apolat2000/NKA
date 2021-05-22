<template>
    <div class="_display-flex _flex-direction-column _align-items-center">
        <img src="../assets/banner.png" draggable="false" class="_width-50" />
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "home",
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/login");
      this.reloadNav();
      console.log("Logged out");
    },
    reloadNav() {
      this.$root.$refs.Navbar.reloadNav();
    }
  },
  created() {
    let jwtToken = localStorage.getItem("jwt_token");
    if (jwtToken === null || jwtToken === "") {
      this.logout();
    }
  },
  async mounted() {
    try {
      const jwt_token = localStorage.getItem("jwt_token");
      if (jwt_token) {
        let result = await axios.post(
          "http://localhost:3000/verifyRefreshToken",
          {},
          {
            headers: {
              Authorization: `Bearer ${jwt_token}`,
            },
          }
        );
        if (result.status === 200) {
          localStorage.setItem("jwt_token", result.data.jwt_token);
          console.log("refreshed token");
        }
      }
    } catch (err) {
      console.log(err.message);
      this.logout();
    }
  }
};
</script>