<template>
  <div id="app">
    <i-layout>
      <i-layout-content class="_margin-bottom-1">
        <navbar />
        <router-view :key="$route.path" />
      </i-layout-content>
      <i-layout-footer class="_background-light">
        <i-container
          ><i-row center-xs middle-xs>
            <i-column xs="2">
              <img
                class="_width-75"
                src="https://upload.wikimedia.org/wikipedia/commons/1/1e/RWTH_Logo_3.svg"
              />
            </i-column>

            <!-- <i-column xs="2">
              <img
                class="_width-75"
                src="https://3lhowb48prep40031529g5yj-wpengine.netdna-ssl.com/wp-content/uploads/2019/10/logo-vuejs-min.png"
              />
            </i-column> -->
          </i-row>
        </i-container>
      </i-layout-footer>
    </i-layout>
  </div>
</template>

<script>
//import Bottom from './components/Bottom.vue'
import Navbar from "./components/common/Navbar.vue";
export default {
  components: {
    Navbar,
    //,Bottom
  },
  name: "app",
};
</script>