<template>
  <i-navbar class="profilee" id="navbar">
    <i-navbar-brand :to="{ name: 'home' }"
      ><img
        draggable="false"
        width="36"
        height="36"
        src="../../assets/navlogo.png"
      />
    </i-navbar-brand>
    <i-navbar-items class="_justify-content-space-between">
      <i-nav v-if="isLoggedIn()">
        <i-nav-item :to="{ name: 'new-tutorial' }">New Tutorial</i-nav-item>
        <i-nav-item :to="{ name: 'tutorials' }">Find Tutorials</i-nav-item>
        <i-nav-item :to="{ name: 'social' }">Social</i-nav-item>
        <i-nav-item :to="{ name: 'lectures' }">Lectures</i-nav-item>
        <i-nav-item :to="{ name: 'earn-coins' }">Earn Coins</i-nav-item>
      </i-nav>
      <i-nav class="_margin-left-auto">
        <i-dropdown v-if="isLoggedIn()" placement="bottom-end">
          <i-button variant="primary">{{ this.getName() }}</i-button>
          <i-dropdown-menu>
            <i-dropdown-item
              @click="$router.push(`/users/${getUserId()}`)"
              href=""
              >Your profile</i-dropdown-item
            >
            <i-dropdown-item href="">Settings</i-dropdown-item>
            <i-dropdown-item href="" disabled
              >Something disabled here</i-dropdown-item
            >
            <i-dropdown-divider />
            <i-dropdown-item @click="logout">Logout</i-dropdown-item>
          </i-dropdown-menu>
        </i-dropdown>
        <i-nav-item v-if="!isLoggedIn()" :to="{ name: 'login' }"
          >Login</i-nav-item
        >
        <i-nav-item v-if="!isLoggedIn()" :to="{ name: 'register' }"
          >Register</i-nav-item
        >
      </i-nav>
    </i-navbar-items>
  </i-navbar>
</template>

<script>
export default {
  data() {
    return {
      firstName: ""
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/login");
      this.reloadNav();
      console.log("Logged out");
    },
    getName() {
      return localStorage.getItem("firstName");
    },
    getUserId() {
      return localStorage.getItem("userID");
    },
    isLoggedIn() {
      return localStorage.getItem("jwt_token");
    },
    reloadNav() {
      this.$forceUpdate();
    },
  },
  created() {
    this.$root.$refs.Navbar = this;
  },
};
</script>

<style scoped>
.profilee {
  z-index: 1050;
}
</style>