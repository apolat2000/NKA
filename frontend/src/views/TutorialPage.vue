<template>
  <div class="w-full h-full grid grid-cols-5 row-span-1">
    <!-- <div v-if="!loaded" class="col-span-5">
      <tut-page-loading />
    </div> -->
    <div
      v-if="loaded && (isStudent || isTutor)"
      class="hidden sm:block sm:col-span-1"
    >
      <tut-page-side
        :tutName="tutorial.title"
        :page="$route.params.page"
        :isActive="tutorial.is_active"
      />
    </div>
    <div
      v-if="loaded"
      :class="
        isStudent || isTutor ? 'col-span-5 sm:col-span-4 mb-16' : 'col-span-5'
      "
      class="h-3/4"
    >
      <input
        type="file"
        single
        ref="doc"
        class="hidden bg-gray-600 text-white text-sm font-semibold py-4 px-4 border border-black rounded-md shadow"
        name="doc"
        id="doc"
        accept=".pdf"
        @change="docAction($event)"
      />
      <tut-sum
        v-if="this.$route.params.page === 'summary' && this.tutorial.tutor"
        :students="tutorial.students"
        :class_size="tutorial.class_size"
        :tutor="tutorial.tutor"
        :lecture="tutorial.lecture"
        :title="tutorial.title"
        :first_date_nr="Date.parse(tutorial.first_date)"
        :frequency="tutorial.frequency"
        :description="tutorial.description"
        :is_active="tutorial.is_active"
        :isTutor="isTutor"
        :isStudent="isStudent"
        :imgURI="imgURI"
        :loaded="loaded"
        :docs="docs.length < 4 ? docs : docs.slice(0,3)"
        :docs_sliced="docs.length >= 4"
        v-on:clickedOnNewDoc="$refs.doc.click()"
      />

      <feed
        v-if="this.$route.params.page === 'feed' && this.tutorial._id"
        :tutorialId="tutorial._id"
        :isTutor="isTutor"
        :isStudent="isStudent"
        :scope="getScope()"
        class="m-4 mt-8"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import TutPageSide from "../components/tutorial/TutPageSide.vue";
import TutSum from "../components/tutorial/TutSum.vue";
import Feed from "../components/tutorial/feed/Feed.vue";
//import TutPageLoading from '../components/tutorial/TutPageLoading.vue'

export default {
  name: "TutorialPage",
  components: {
    TutPageSide,
    TutSum,
    Feed,
    // TutPageLoading
  },
  data() {
    return {
      tutorial: { lecture: {}, tutor: {} },
      imgURI: "nullum",
      isTutor: false,
      isStudent: false,
      loaded: false,
      doc: "",
      docs: []
    };
  },
  methods: {
    getScope() {
      return this.isTutor ? "tutor" : this.isStudent ? "student" : "global";
    },
    parseDate: function (dte) {
      console.log(Date.parse(dte));
      return Date.parse(dte);
    },
    docAction: function (event) {
      this.doc = event.target.files[0];
      let myDoc = {
        title: "deneme",
        description: "desc",
        tut: this.tutorial._id,
        visibility: "ALL",
        doc: this.doc ? this.doc : "",
      };
      var formData = new FormData();
      Object.keys(myDoc).forEach((key) => formData.append(key, myDoc[key]));
      console.log(formData);
      try {
        axios.post(
          `http://localhost:3000/docs/${this.tutorial._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
            },
          }
        );
      } catch (err) {
        window.alert("Account could not be created");
        console.log(err);
      }
    },
  },
  created() {
    //user is not authorized => Remain at login page
    if (localStorage.getItem("jwt_token") === null) {
      this.$router.push("/login");
    }
  },
  async mounted() {
    try {
      const jwt_token = localStorage.getItem("jwt_token");
      const userID = localStorage.getItem("userID");
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
        let resTut = await axios.get(
          "http://localhost:3000/tutorial/" + this.$route.params.id,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
            },
          }
        );
        this.tutorial = resTut.data;

        
        if (this.tutorial.tutor.img_path !== "") {
          if (this.tutorial.tutor.img_path.length > 0) {
            let imageResult = await axios.head(
              "http://localhost:3000/" + this.tutorial.tutor.img_path
            );
            if (imageResult.status === 200) {
              this.imgURI =
                "http://localhost:3000/" + this.tutorial.tutor.img_path;
            }
          }
        } else {
          this.imgURI = "http://localhost:3000/profilepics/defUser.png";
        }
        if (userID === this.tutorial.tutor._id) {
          this.isTutor = true;
        }
        if (this.tutorial.students.includes(userID)) {
          this.isStudent = true;
        }
        let resDoc = await axios.get(
          "http://localhost:3000/docs/" + this.tutorial._id,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
              Scope: this.getScope()
            },
          }
        );
        this.docs = resDoc.data;

        this.loaded = true;
      }
    } catch (err) {
      console.log(err.message);
    }
  },
};
</script>
