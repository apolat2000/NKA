<template>
  <div id="app">
    <i-layout>
      <i-layout-content class="_margin-bottom-1">
        <navbar v-if="!($route.name === 'login' || $route.name === 'register')" /> 
        <router-view :key="$route.path" />
      </i-layout-content>
      <i-layout-footer class="_background-light">
        <i-container>
          <i-row center-xs middle-xs>
            <i-column xs="2">
              <img
                class="_width-75"
                src="https://upload.wikimedia.org/wikipedia/commons/1/1e/RWTH_Logo_3.svg"
              />
              {{$route.name}}
            </i-column>
          </i-row>
        </i-container>
      </i-layout-footer>
    </i-layout>
  </div>
</template>

<script>
//import axios from "axios";
//import Bottom from './components/Bottom.vue'
import Navbar from "./components/common/Navbar.vue";
export default {
  components: {
    Navbar,
    //,Bottom
  },
  name: "app",
  // watch: {
  //   async $route() {
  //     let jwtToken = localStorage.getItem("jwt_token");
  //     if (jwtToken === null || jwtToken === "") {
  //       this.logout();
  //     }
  //     try {
  //     const jwt_token = localStorage.getItem("jwt_token");
  //     if (jwt_token) {
  //       let result = await axios.post(
  //         "http://localhost:3000/verifyRefreshToken",
  //         {},
  //         {
  //           headers: {
  //             Authorization: `Bearer ${jwt_token}`,
  //           },
  //         }
  //       );
  //       if (result.status === 200) {
  //         localStorage.setItem("jwt_token", result.data.jwt_token);
  //         console.log("refreshed token");
  //       }
  //     }
  //   } catch (err) {
  //     this.logout();
  //     console.log(err.message);
  //   }
  //   },
  // },
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
  mounted() {
    console.log(this.$route.name);
  }
  // created() {
  //   let jwtToken = localStorage.getItem("jwt_token");
  //   if (jwtToken === null || jwtToken === "") {
  //     this.logout();
  //   }
  // },
  // async mounted() {
  //   try {
  //     const jwt_token = localStorage.getItem("jwt_token");
  //     if (jwt_token) {
  //       let result = await axios.post(
  //         "http://localhost:3000/verifyRefreshToken",
  //         {},
  //         {
  //           headers: {
  //             Authorization: `Bearer ${jwt_token}`,
  //           },
  //         }
  //       );
  //       if (result.status === 200) {
  //         localStorage.setItem("jwt_token", result.data.jwt_token);
  //         console.log("refreshed token");
  //       }
  //     }
  //   } catch (err) {
  //     this.logout();
  //     console.log(err.message);
  //   }
  // },
};
</script>