<template>
  <i-layout>
    <i-layout-header class="_padding-0">
      <i-navbar
      fluid
        :collapse="false"
        class="_background-gray-30"
        v-if="loaded && (isStudent || isTutor)"
      >
        <i-navbar-brand class="_margin-left-1">
          <i-hamburger-menu
            
            :active="showSide"
            @click="showSide = !showSide"
          >
          </i-hamburger-menu>
        </i-navbar-brand>
        <i-navbar-items>
          <div class="_display-flex _flex-direction-column _margin-right-1">
          <h3 class="_margin-y-0 _text-uppercase">{{ tutorial.title }}</h3>
          <h6 class="_margin-y-0">{{tutorial.lecture.title}}</h6>
          </div>
          <i-badge
            class="_margin-right-1"
            :variant="tutorial.is_active ? 'success' : 'danger'"
            v-if="loaded"
          >
            {{ tutorial.is_active ? "Active" : "Inactive" }}
          </i-badge>
          <i-badge class="_margin-right-auto" variant="info" v-if="loaded">
            {{ tutorial.frequency }}
          </i-badge>
        </i-navbar-items>
        <i-navbar-items class="_justify-content-end _margin-right-1">
          <p>{{tutorial.students.length}}/{{ tutorial.class_size }} <span><i class="users icon"></i></span></p>
        </i-navbar-items>
      </i-navbar>
    </i-layout-header>
    <i-layout vertical>
      <i-sidebar
        size="lg"
        v-model="showSide"
        :collapse="true"
        v-if="loaded && (isStudent || isTutor)"
      >
        <i-nav
          vertical
          class="_display-flex _flex-direction-column _align-items-stretch _padding-top-2 _padding-left-2"
        >
          <h3
            @click="$router.push({ params: { page: 'summary' } })"
            :class="$route.params.page === 'summary' ? classChosen : classNot"
            style="cursor: pointer"
            class="_margin-bottom-2 _margin-top-0"
          >
            Summary
          </h3>
          <h3
            @click="$router.push({ params: { page: 'announcements' } })"
            :class="
              $route.params.page === 'announcements' ? classChosen : classNot
            "
            style="cursor: pointer"
            class="_margin-bottom-1 _margin-top-0"
          >
            Announcements
          </h3>
          <h3
            @click="$router.push({ params: { page: 'documents' } })"
            :class="$route.params.page === 'documents' ? classChosen : classNot"
            style="cursor: pointer"
            class="_margin-bottom-1 _margin-top-0"
          >
            Documents
          </h3>
          <h3
            @click="$router.push({ params: { page: 'feed' } })"
            :class="$route.params.page === 'feed' ? classChosen : classNot"
            style="cursor: pointer"
            class="_margin-bottom-1 _margin-top-0"
          >
            Feed
          </h3>
        </i-nav>
      </i-sidebar>
      <i-layout-content v-if="$route.params.page === 'join'">
        <img src="../assets/resources.png" />
      </i-layout-content>
      <i-layout-content v-else-if="loaded && (isStudent || isTutor)">
        <input
          type="file"
          single
          ref="doc"
          class="_display-none"
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
          :docs="docs.length < 3 ? docs : docs.slice(0, 2)"
          :docs_sliced="docs.length >= 3"
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
      </i-layout-content>
      <i-layout-content v-else>
        <h4>LOADING</h4>
      </i-layout-content>
    </i-layout>
  </i-layout>
</template>

<script>
import axios from "axios";
//import TutPageSide from "../components/tutorial/TutPageSide.vue";
import TutSum from "../components/tutorial/TutSum.vue";
import Feed from "../components/tutorial/feed/Feed.vue";
//import TutPageLoading from '../components/tutorial/TutPageLoading.vue'

export default {
  name: "TutorialPage",
  components: {
    //TutPageSide,
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
      docs: [],
      showSide: false,
      classNot: "",
      classChosen: "_text-primary",
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

        if (this.$route.params.page !== "join") {
          let resTut = await axios.get(
            "http://localhost:3000/tutorial/" + this.$route.params.id,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
                Wanted: "whole",
                Whats_my_scope: userID,
              },
            }
          );

          let clientScope = resTut.headers.client_scope;

          if (clientScope === "visitor") {
            this.$router.push({ params: { page: "join" } });
          }

          clientScope === "tutor"
            ? (this.isTutor = true)
            : (this.isStudent = true);

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

          let resDoc = await axios.get(
            "http://localhost:3000/docs/" + this.tutorial._id,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
                Scope: this.getScope(),
              },
            }
          );

          this.docs = resDoc.data;

          this.loaded = true;
          console.log(this.loaded);
        } else {
          let resTut = await axios.get(
            "http://localhost:3000/tutorial/" + this.$route.params.id,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
                Wanted: "whole",
                Whats_my_scope: userID,
              },
            }
          );

          let clientScope = resTut.headers.client_scope;

          if (clientScope !== "visitor") {
            this.$router.push({ params: { page: "summary" } });
          }

          this.tutorial = resTut.data;
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  },
};
</script>

<style scoped>
.hamb {
  z-index: 1040;
  position: absolute;
  /* left: 10px;
  top: -40px; */
}
</style>