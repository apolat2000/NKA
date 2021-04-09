<template>
  <div id="app" class="min-h-screen">
    <navbar class="z-50" />
    <div class="h-full">
      <router-view :key="$route.path" class="mt-16" />
    </div>
  </div>
</template>

<script>
//import Bottom from './components/Bottom.vue'
import Navbar from "./components/common/Navbar.vue";
export default {
  components: {
    Navbar
    //,Bottom
  },
  name: "app",
};
</script>