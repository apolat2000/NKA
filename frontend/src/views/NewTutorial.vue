<template>
  <div id="new-tutorial">
    <h1 class="pt-12 pb-4 text-white text-center">Create New Tutorial</h1>
    <tut-form :tutorial="tutorial"/>
  </div>
</template>

<script>
import TutForm from "../components/tutorial/TutForm.vue";
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
  beforeCreate() {
    //user is not authorized => Remain at login page
    if (localStorage.getItem("jwt_token") == null) {
      this.$router.push("/login");
    }
  },
};
</script>