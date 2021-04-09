<template>
  <div class="w-full grid grid-cols-5 row-span-1" id="tutorials">
    <div class="hidden sm:block sm:col-span-1">
      <tuts-side />
    </div>
    <div class="col-span-5 sm:col-span-4">
      <h1 class="pt-12 pb-4 text-white text-center">All Tutorials</h1>
      <tut-list />
    </div>
  </div>
</template>

<script>
import TutList from "../components/tutorial/TutList.vue";
import TutsSide from "../components/tutorial/TutsSide.vue";
import axios from "axios";

export default {
  name: "TutorialsPage",
  components: { TutList, TutsSide },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/login");
      console.log("Logged out");
    },
  },
  async created() {
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
      this.logout();
      console.log(err.message);
    }
  },
};
</script>