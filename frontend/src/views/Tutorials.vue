<template>
  <div id="tutorials">
    <h1 class="_text-center">All Tutorials</h1>
      <tut-list class="_margin-x-auto _width-75" />
  </div>
</template>

<script>
import TutList from "../components/tutorial/TutList.vue";
//import TutsSide from "../components/tutorial/TutsSide.vue";
import axios from "axios";

export default {
  name: "TutorialsPage",
  components: { TutList },
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