<template>
  <i-container class="container _margin-x-0" fluid>
    <i-alert
      @click="showToaster = false"
      v-if="showToaster"
      style="position: absolute; cursor: pointer"
      class="toaster"
      variant="success"
    >
      <p class="_text-center">
        Now searching in <b>{{ currentCoS.verbose_name }}</b>
      </p>
    </i-alert>

    <i-row top-xs class="_padding-1">
      <i-column xs="12">
        <div
          class="_border _border-color-gray-70 _rounded _padding-1 _padding-y-1"
        >
          <div class="_display-flex">
            <h1 class="_font-weight-bold">Search in</h1>
            <i-tooltip placement="bottom" trigger="hover">
              <i-button
                @click="showCoSModal(true)"
                style="margin-left: 1ch"
                class="_padding-0"
                ><h1 class="_margin-bottom-0">{{ currentCoS.verbose_name }}</h1>
                <div style="position: absolute; top: -10px; right: -10px">
                  <pencil-icon />
                </div>
              </i-button>
              <template slot="body">Click to change</template>
            </i-tooltip>
          </div>
          <div class="_display-flex">
            <i-button
              @click="showFilters = !showFilters"
              class="_margin-right-1"
              style="height: 37px"
            >
              <filter-icon class="" />
            </i-button>
            <i-input
              class="_width-100"
              v-model="queryText"
              placeholder="tutorials, lectures, people, anything..."
            >
              <i slot="prefix" @click="search()"
                ><i-icon style="cursor: pointer" icon="search"
              /></i>
            </i-input>
          </div>
          <div
            v-if="showFilters"
            class="_margin-top-1 _border _rounded _background-gray-20 _padding-1"
          >
            <i-checkbox-group v-model="checkedFilters">
              <i-checkbox value="tutorials">Tutorials</i-checkbox>
              <i-checkbox value="lectures">Lectures</i-checkbox>
              <i-checkbox value="users">People</i-checkbox>
              <i-checkbox value="coses">Courses of study</i-checkbox>
            </i-checkbox-group>
          </div>
          <i-loader v-if="searching" variant="dark" />
          <div
            class="_margin-top-1 _display-flex _justify-content-space-between _align-content-stretch"
          >
            <i-container>
              <i-row
                :between="true"
                class="_flex-grow-1"
                v-for="row in listSearchElements"
                :key="row[0]._id"
              >
                <i-column
                  class="_margin-y-1-2 _margin-x-0 _padding-x-0"
                  v-for="e in row"
                  :key="e._id"
                  :xs="4"
                >
                  <i-card v-if="e.class_size" class="_width-full _margin-x-0">
                    <template slot="header">
                      <div
                        class="_display-flex _justify-content-space-between _align-items-center"
                      >
                        <div>
                          <h5
                            class="_margin-y-0 _a _text-truncate _font-weight-bold"
                            style="max-width: 150px"
                          >
                            {{ e.title }}
                            <span style="color: green; font-size: 2rem">
                              •
                            </span>
                          </h5>
                          <p class="_margin-0">{{ e.lecture.name }}</p>
                        </div>
                        <!-- <img
                          @click="
                            $router.push({
                              name: 'user-page',
                              params: { id: e.tutor._id },
                            })
                          "
                          slot="image"
                          src="../assets/defUser.png"
                          alt="tutor"
                          class="_rounded-circle"
                          style="width: 35px; cursor: pointer"
                        /> -->
                        <p>
                          {{ e.students.length }}/{{ e.class_size }}
                          <span>
                            <i class="users icon"></i>
                          </span>
                        </p>
                      </div>
                    </template>
                    <p>
                      {{ e.description }}
                    </p>
                    <template slot="footer">
                      <div
                        class="_display-flex _justify-content-space-between _align-items-center"
                      >
                        <div>
                          <p class="_margin-0">Next meeting:</p>
                          <p class="_margin-0">{{ niceDate(e.first_date) }}</p>
                        </div>
                        <div>
                          <div v-if="isUserAStudentInTutorial(e.students)">
                            <i-button
                              :to="{
                                name: 'tutorial-page',
                                params: { id: e._id, page: 'summary' },
                              }"
                              outline
                              variant="success"
                              >Joined <i-icon icon="chevron-right" />
                            </i-button>
                          </div>
                          <i-button :to="{
                                name: 'tutorial-page',
                                params: { id: e._id, page: 'join' },
                              }" variant="success" v-else>Join</i-button>
                        </div>
                      </div>
                    </template>
                  </i-card>
                  <i-card v-if="e.email">
                    <template slot="header">
                      <i-container>
                        <i-row middle-xs>
                          <i-column xs="4">
                            <img
                              :src="
                                e.img_path === ''
                                  ? 'http://localhost:3000/profilepics/defUser.png'
                                  : e.img_path
                              "
                              alt="An error occured!"
                              class="_border _rounded-circle"
                              style="width: 60px"
                            />
                          </i-column>
                          <i-column
                            xs="8"
                            class="_display-flex _flex-direction-column _justify-content-center"
                          >
                            <h5
                              class="_text-center _margin-bottom-0 _font-weight-bold"
                            >
                              {{ e.first_name }} {{ e.last_name }}
                            </h5>
                            <h6 class="_text-center _margin-y-0">
                              @{{ e.username }}
                            </h6>
                            <h6
                              v-for="cos in e.courses_of_study"
                              :key="cos._id"
                              style="margin-top: 5px"
                              class="_text-center"
                            >
                              {{ cos.verbose_name }}
                            </h6>
                          </i-column>
                        </i-row>
                      </i-container>
                    </template>
                    <i-list-group :bordered="false">
                      <i-list-group-item>
                        <p>{{ e.bio }}</p>
                      </i-list-group-item>
                      <i-list-group-item>
                        <p>
                          <b>Expert in:</b>
                          {{ e.expert_of_lectures.verbose_name }}
                        </p>
                      </i-list-group-item>
                    </i-list-group>
                  </i-card>
                </i-column>
              </i-row>
            </i-container>
          </div>
        </div>
      </i-column>
    </i-row>
    <i-row top-xs class="_padding-1">
      <i-column xs="12">
        <div
          class="_border _border-color-gray-70 _rounded _padding-1 _padding-y-1"
        >
          <h1 class="_font-weight-bold">Recommendations</h1>
        </div>
      </i-column>
    </i-row>
    <i-modal v-model="cosEdit">
      <template slot="header">Find a course of study to search in</template>
      <i-form>
        <i-form-group class="_display-flex _justify-content-space-between">
          <!-- <i-button type="submit" variant="success">
            Save
          </i-button> -->
          <i-button
            type="submit"
            variant="success"
            @click="
              changeCurrentCoS({
                verbose_name: 'all courses of study',
                _id: 'all',
              })
            "
          >
            Search in all courses of study
          </i-button>
          <!-- <i-button variant="danger"
            >Discard</i-button
          > -->
        </i-form-group>
        <i-form-group>
          <i-dropdown class="_width-100" trigger="manual">
            <i-input
              class="_width-100"
              v-model="queryTextCoS"
              :placeholder="
                '... or search here, like ' + currentCoS.verbose_name + '..'
              "
              @input="searchCoS(queryTextCoS)"
            >
              <i slot="prefix">
                <i-icon style="cursor: pointer" icon="search" />
              </i>
            </i-input>
            <i-dropdown-menu v-model="showCoSDropdown">
              <i-dropdown-item
                v-for="cos in computedSimilarityForCoSSearch()"
                :key="cos._id"
                style="cursor: pointer"
                @click="changeCurrentCoS(cos)"
              >
                {{ cos.verbose_name }}
              </i-dropdown-item>
            </i-dropdown-menu>
          </i-dropdown>
        </i-form-group>
      </i-form>
    </i-modal>
  </i-container>
</template>

<script>
import axios from "axios";
import strsim from "string-similarity";
import chunk from "chunk";

import FilterIcon from "vue-material-design-icons/Filter.vue";
import PencilIcon from "vue-material-design-icons/Pencil.vue";

export default {
  components: { FilterIcon, PencilIcon },
  data() {
    return {
      queryText: "",
      showFilters: false,
      checkedFilters: ["tutorials", "lectures", "users", "coses"],
      results: {},
      queryLoaded: false,
      queryAllCoS: false,
      currentCoS: {},
      searching: false,
      cosEdit: false,
      queryTextCoS: "",
      allCoS: [],
      showCoSDropdown: true,
      showToaster: false,
    };
  },
  computed: {
    listSearchElements: function () {
      console.log(this.results);
      console.log(Object.values(this.results).flat());
      console.log(chunk(Object.values(this.results).flat(), 3));
      return chunk(Object.values(this.results).flat(), 3);
    },
  },
  methods: {
    isUserAStudentInTutorial: function (students) {
      return students.includes(localStorage.userID);
    },
    changeCurrentCoS: function (cos) {
      this.currentCoS = cos;
      this.cosEdit = false;
      this.showCoSDropdown = false;
      this.showToaster = true;
      this.queryTextCoS = "";
      setTimeout(() => {
        this.showToaster = false;
      }, 4000);
    },
    computedSimilarityForCoSSearch: function () {
      const returned = this.allCoS.filter(
        (c) =>
          strsim.compareTwoStrings(this.queryTextCoS, c.verbose_name) > 0.12
      );

      if (returned.length === 0) return [{ verbose_name: "No matches here." }];
      else return returned;
    },
    niceDate: function (myDate) {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const dateObj = new Date(myDate);
      const month = monthNames[dateObj.getMonth()];
      const day = String(dateObj.getDate()).padStart(2, "0");
      const year = dateObj.getFullYear();
      const hours =
        String(dateObj.getHours()).length === 1
          ? "0" + dateObj.getHours()
          : dateObj.getHours();
      const mins =
        String(dateObj.getMinutes()).length === 1
          ? "0" + dateObj.getMinutes()
          : dateObj.getMinutes();
      const output = day + " " + month + " " + year + ", " + hours + ":" + mins;
      return output;
    },
    search() {
      this.searching = true;
      console.log("searching...");
      console.log(this.checkedFilters.join("-"));
      axios
        .get(
          "http://localhost:3000/explore/search/" +
            this.queryText +
            "/" +
            this.currentCoS._id +
            "/" +
            this.checkedFilters.join("-"),
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          this.searching = false;
          this.results = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    searchCoS(text) {
      if (text.length >= 3) {
        this.showCoSDropdown = true;
      } else {
        this.showCoSDropdown = false;
      }
    },
    async showCoSModal(show) {
      if (this.allCoS.length === 0) {
        let result = await axios.get(
          "http://localhost:3000/courses-of-study/is-no-query/verbose_name",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
            },
          }
        );
        if (result.status === 200) {
          this.allCoS = result.data;
        } else {
          console.log(result.status);
        }
      }
      if (show) {
        this.cosEdit = true;
      } else {
        this.cosEdit = false;
        this.showCoSDropdown = false;
      }
    },
  },
  async mounted() {
    let result2 = await axios.get(
      "http://localhost:3000/user/" +
        localStorage.getItem("userID") +
        "/courses_of_study-username",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
        },
      }
    );
    if (result2.status === 200) {
      this.currentCoS = result2.data.courses_of_study[0];
    }
  },
};
</script>

<style scoped>
.toaster {
  animation-duration: 3.5s;
  animation-name: slidein;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  width: 350px;
  left: 0;
  right: 0;
  transform: translateY(-200px);
  z-index: 1050;
}
@keyframes slidein {
  from {
    transform: translateY(-200px);
  }
  15% {
    transform: translateY(-30px);
  }
  90% {
    transform: translateY(-30px);
  }
  to {
    transform: translateY(-200px);
  }
}
</style>