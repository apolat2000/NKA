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
        <i-nav-item :to="{ name: 'explore-tutorials' }">Explore</i-nav-item>
        <i-nav-item :to="{ name: 'new-tutorial' }">Create</i-nav-item>
        <i-nav-item>Socialize</i-nav-item>
        <!-- <i-nav-item :to="{ name: 'earn-coins' }">Earn Coins</i-nav-item> -->
      </i-nav>
      <i-nav class="_margin-left-auto">
        <i-dropdown v-if="isLoggedIn()" placement="bottom-end">
          <i-button variant="secondary" class="_display-flex _align-items-center">
            <img :src="ppSource()" class="_rounded-circle" style="width:30px; height: 30px;" alt="profile picture">
            <p class="_margin-y-0">&nbsp;&nbsp;{{ this.getName() }}</p>
            <MenuDown class="_padding-y-0 _margin-y-0" />
          </i-button>
          <i-dropdown-menu>
            <i-dropdown-item
              :to="{ name: 'user-page', params: { id: getUserId() } }"
            >
              Your profile
            </i-dropdown-item>
            <i-dropdown-item href="">Settings</i-dropdown-item>
            <i-dropdown-item href="" disabled
              >Something disabled here</i-dropdown-item
            >
            <i-dropdown-item :to="{ name: 'socialIsTutorIsStud' }">
              IsTutIsStud
            </i-dropdown-item>
            <i-dropdown-item :to="{ name: 'socialNotTutorIsStud' }">
              NotTutIsStud
            </i-dropdown-item>
            <i-dropdown-item :to="{ name: 'socialIsTutorNotStud' }">
              IsTutNotStud
            </i-dropdown-item>
            <i-dropdown-item :to="{ name: 'socialNotTutorNotStud' }">
              NotTutNotStud
            </i-dropdown-item>
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
import MenuDown from "vue-material-design-icons/MenuDown.vue";
export default {
  components: {
    MenuDown
  },
  data() {
    return {
      firstName: ""
    };
  },
  methods: {
    ppSource: function() {
      return localStorage.img_path == "" ? "http://localhost:3000/profilepics/defUser.png" : "http://localhost:3000/"+localStorage.img_path ;
    },
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