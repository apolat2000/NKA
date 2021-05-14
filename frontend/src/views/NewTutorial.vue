<template>
  <div id="new-tutorial" class="_margin-top-1">
    <div>
    <h1 class="_text-center">Create New Tutorial</h1>
    <!-- <ul>
      <li :key="tut.similarity" v-for="tut in titleSimilarityArray">
        {{ tut.title }} {{tut.similarity }}
      </li>
    </ul> -->
    {{ titleSimilarityArray }}
    <tut-form @updatedTitle="updateSimilarityList" @getTitles="onGetTitles" :tutorial="tutorial" />
    {{ titlesOfOtherTutorials }}
    </div>
  </div>
</template>

<script>
import TutForm from "../components/tutorial/TutForm.vue";
import axios from "axios";
import strsim from "string-similarity";

export default {
  name: "NewTutorial",
  components: { TutForm },
  data() {
    return {
      tutorial: {
        title: "LinA Klausur 1. Termin",
        description:
          "Linear algebra is the branch of mathematics concerning linear equations and linear maps and their representations in vector spaces and through matrices.",
        frequency: "WEEKLY",
        firstDate: "05.05.2021, 18:00.",
        classSize: 5,
        lecture: "Linear Algebra",
      },
      titlesOfOtherTutorials: [],
      titleSimilarityArray: []
    };
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
    strSimilarity(str1, str2) {
      console.log(strsim.compareTwoStrings(str1, str2));
    },
    updateSimilarityList(newTitle) {
      console.log('called');
      if(this.titlesOfOtherTutorials.length !== 0) {

        let tempArray = [];

        this.titlesOfOtherTutorials.forEach(e => {
          tempArray.push({similarity: strsim.compareTwoStrings(e.title, newTitle), title: e.title, _id: e._id})
        });

        this.titleSimilarityArray = tempArray.filter(x => x.similarity > 0.1)

      }
    },
    async onGetTitles(lecture) {
      try {
        let result = await axios.get(
          "http://localhost:3000/tutorials/get-titles/" + lecture,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
            },
          }
        );
        if (result.status === 200) {
          console.log(result.data);
          this.titlesOfOtherTutorials = result.data;
        }
      } catch (err) {
      console.log(err.message);
    }
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
  },
};
</script>