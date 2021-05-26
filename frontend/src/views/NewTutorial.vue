<template>
  <div id="new-tutorial" class="_margin-top-1">
    <div>
    <h1 class="_text-center">Create New Tutorial</h1>
    <ul>
      <li :key="tut.rating" v-for="tut in titleSimilarityArray">
        {{ tut.target }} {{tut.rating }}
      </li>
    </ul>
    <tut-form @updatedTitle="updateSimilarityList" @getTitles="onGetTitles" :tutorial="tutorial" />
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
        title: "",
        description:
          "",
        frequency: "",
        firstDate: "",
        classSize: 1,
        lecture: "",
      },
      titlesOfOtherTutorials: [],
      titleSimilarityArray: []
    };
  },
  methods: {
    sim() {
      console.log(strsim.compareTwoStrings('Ahmet Polat','Achmed')); 
    },
    strSimilarity(str1, str2) {
      console.log(strsim.compareTwoStrings(str1, str2));
    },
    updateSimilarityList(newTitle) {
      if(this.titlesOfOtherTutorials.length !== 0) {

        this.titleSimilarityArray = strsim.findBestMatch(newTitle, this.titlesOfOtherTutorials.map(a => a.title)).ratings.sort(function(a, b) {a.rating - b.rating}).slice(0,5)

        // let tempArray = [];

        // this.titlesOfOtherTutorials.forEach(e => {
        //   tempArray.push({similarity: strsim.compareTwoStrings(e.title, newTitle), title: e.title, _id: e._id})
        // });

        // this.titleSimilarityArray = tempArray.filter(x => x.similarity > 0.1)

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
  }
};
</script>