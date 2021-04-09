<template>
<i-navbar>
    <i-navbar-brand :to="{ name: 'home' }"><img
              draggable="false"
              width="36"
              height="36"
              src="../../assets/navlogo.png"
            />
    </i-navbar-brand>
    <i-navbar-items>
        <i-nav>
            <i-nav-item :to="{ name: 'new-tutorial' }">New Tutorial</i-nav-item>
            <i-nav-item :to="{ name: 'tutorials' }">Find Tutorials</i-nav-item>
            <i-nav-item :to="{ name: 'social' }">Social</i-nav-item>
            <i-nav-item :to="{ name: 'lectures' }">Lectures</i-nav-item>
            <i-nav-item :to="{ name: 'earn-coins' }">Earn Coins</i-nav-item>
        </i-nav>
        <i-nav>
            <i-dropdown placement="bottom-end">
                <i-button variant="primary">Dropdown</i-button>
                <i-dropdown-menu>
                    <i-dropdown-item @click="$router.push(`/users/${getUserId()}`)" href="">Your profile</i-dropdown-item>
                    <i-dropdown-item href="">Settings</i-dropdown-item>
                    <i-dropdown-item href="" disabled>Something disabled here</i-dropdown-item>
                    <i-dropdown-divider />
                    <i-dropdown-item @click="logout">Log out</i-dropdown-item>
                </i-dropdown-menu>
            </i-dropdown>
        </i-nav>
    </i-navbar-items>
</i-navbar>
<!-- 
  <div>
    <nav
      class="fixed w-full bg-gradient-to-l from-blue-500 to-indigo-800 flex justify-between items-center h-20 text-sm"
    >
      <div class="flex justify-start">
        <div class="mx-4">
          <router-link to="/">
            <img
              class="select-none h-12 w-12"
              draggable="false"
              width="54"
              height="54"
              src="../../assets/navlogo.png"
            />
          </router-link>
        </div>
        <div v-if="isLoggedIn()" class="hidden lg:block">
          <button
            @click="$router.push('/tutorials/new')"
            class="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-4 px-4 border border-black rounded shadow mr-4"
          >
            <i class="plus circle icon"></i>Create New Tutorial
          </button>
          <button
            @click="$router.push('/tutorials')"
            class="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-4 px-4 border border-black rounded shadow mr-4"
          >
            <i class="search icon"></i>Find Tutorials
          </button>
          <button
            @click="$router.push('/social')"
            class="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-4 px-4 border border-black rounded shadow mr-4"
          >
            <i class="users icon"></i>Social
          </button>
          <button
            @click="$router.push('/lectures')"
            class="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-4 px-4 border border-black rounded shadow mr-4"
          >
            <i class="graduation cap icon"></i>Lectures
          </button>
          <button
            @click="$router.push('/earn-coins')"
            class="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-4 px-4 border border-black rounded shadow mr-4"
          >
            <i class="badge dollar icon"></i>Earn Coins
          </button>
        </div>
      </div>
      <div>
        <div class="hidden lg:block">
          <button
            @click="$router.push('/login')"
            v-if="!isLoggedIn()"
            class="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-4 px-4 border border-black rounded shadow mr-4"
          >
            Log in
          </button>
          <button
            @click="$router.push('/register')"
            v-if="!isLoggedIn()"
            class="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-4 px-4 border border-black rounded shadow mr-4"
          >
            Register
          </button>
          <t-dropdown
          :toggleOnHover="true"
          :toggleOnClick="false"
            v-if="isLoggedIn()"
            :text="this.getName()"
            :fixed-classes="{}"
          >
            <a
              @click="$router.push(`/users/${getUserId()}`)"
              href="#"
              class="block px-4 py-2 leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
              role="menuitem"
            >
              Your Profile
            </a>
            <a
              href="#"
              class="block px-4 py-2 leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
              role="menuitem"
            >
              Settings
            </a>
            <a
              @click="logout"
              href="#"
              class="block px-4 py-2 leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
              role="menuitem"
            >
              Log out
            </a>
          </t-dropdown>
        </div>
        <div class="block lg:hidden">
          <t-dropdown text="☰" :fixed-classes="{}" class="text-lg"> </t-dropdown>
        </div>
      </div>
    </nav>
    <hr class="bg-white">
  </div> -->
</template>

<script>
export default {
  data() {
    return {
      firstName: "",
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