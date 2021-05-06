<template>
  <div id="new-tutorial" class="_margin-top-1">
    <h1 class="_text-center">Create New Tutorial</h1>
    <tut-form :tutorial="tutorial"/>
  </div>
</template>

<script>
import TutForm from "../components/tutorial/TutForm.vue";
import axios from "axios";

export default {
  name: "NewTutorial",
  components: { TutForm },
  data() {
    return {
      tutorial: {
        title: 'LinA Klausur 1. Termin',
        description: 'Linear algebra is the branch of mathematics concerning linear equations and linear maps and their representations in vector spaces and through matrices.',
        frequency: 'WEEKLY',
        firstDate: '05.05.2021, 18:00.',
        classSize: 5,
        lecture: 'Linear Algebra'
      }
    }
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/login");
      this.reloadNav();
      console.log("Logged out");
    },
    reloadNav() {
      this.$root.$refs.Navbar.reloadNav();
    },
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