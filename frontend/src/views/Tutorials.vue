<template>
  <div id="tutorials" class="_margin-top-1">
    <h1 class="_text-center">All Tutorials</h1>
    <tut-list class="_margin-x-auto _width-75" />
  </div>
</template>

<script>
import TutList from "../components/tutorial/list/TutList.vue";
//import TutsSide from "../components/tutorial/TutsSide.vue";
//import axios from "axios";

export default {
  name: "TutorialsPage",
  components: { TutList }
};
</script>