<template>
  <i-container class="container _margin-x-0" fluid>
    <i-alert
      v-if="showToaster"
      style="position: absolute"
      class="toaster"
      variant="success"
    >
      <template slot="icon"><i-icon icon="success"></i-icon></template>
      <p>Now searching in {{ currentCoS.verbose_name }}</p>
    </i-alert>

    <i-row top-xs class="_padding-1">
      <i-column xs="12">
        <div class="_display-flex">
          <h1 class="_font-weight-bold">Search in</h1>
          <i-tooltip placement="bottom" trigger="hover">
            <i-button
              @click="showCoSModal(true)"
              style="margin-left: 1ch"
              class="_padding-0"
              ><h1>{{ currentCoS.verbose_name }}</h1></i-button
            >
            <template slot="body">Click to change</template>
          </i-tooltip>
        </div>
        <div
          class="_border _border-color-gray-70 _rounded _padding-1 _padding-y-1"
        >
          <div class="_display-flex">
            <i-input
              class="_width-100"
              v-model="queryText"
              placeholder="tutorials, lectures, people, anything..."
            >
              <i slot="prefix" @click="search()"
                ><i-icon style="cursor: pointer" icon="search"
              /></i>
            </i-input>
            <i-button @click="showFilters = !showFilters" class="_margin-left-1"
              ><i-icon icon="dashboard"
            /></i-button>
          </div>
          <div
            v-if="showFilters"
            class="_margin-top-1 _border _rounded _background-gray-20 _padding-1"
          >
            <i-checkbox-group v-model="checked">
              <i-checkbox value="filterTutorials">Tutorials</i-checkbox>
              <i-checkbox value="filterLectures">Lectures</i-checkbox>
              <i-checkbox value="filterPeople">People</i-checkbox>
            </i-checkbox-group>
          </div>
          <div
            v-if="showFilters"
            class="_margin-top-1 _border _rounded _background-gray-20 _padding-1"
          >
            <i-checkbox-group v-model="checked">
              <i-checkbox value="filterTutorials">Tutorials</i-checkbox>
              <i-checkbox value="filterLectures">Lectures</i-checkbox>
              <i-checkbox value="filterPeople">People</i-checkbox>
            </i-checkbox-group>
          </div>
          <i-loader v-if="searching" variant="dark" />
          <div
            class="_margin-top-1 _display-flex _justify-content-space-between _align-content-stretch"
          >
            <i-card
              v-for="(tut, index) in results.tuts"
              :key="tut._id"
              class="_flex-grow-1"
              :class="index % 2 ? '_margin-left-1-2' : '_margin-right-1-2'"
            >
              <template slot="header">
                <div
                  class="_display-flex _justify-content-space-between _align-items-center"
                >
                  <div>
                    <h5
                      class="_margin-y-0 _a _text-truncate _font-weight-bold"
                      style="max-width: 150px"
                    >
                      {{ tut.title }}
                      <span style="color: green; font-size: 2rem"> • </span>
                    </h5>
                    <p class="_margin-0">{{ tut.lecture.name }}</p>
                  </div>
                  <img
                    @click="
                      $router.push({
                        name: 'user-page',
                        params: { id: tut.tutor._id },
                      })
                    "
                    slot="image"
                    src="../assets/defUser.png"
                    alt="tutor"
                    class="_rounded-circle"
                    style="width: 35px; cursor: pointer"
                  />
                </div>
              </template>
              <p>
                {{ tut.description }}
              </p>
              <template slot="footer">
                <div
                  class="_display-flex _justify-content-space-between _align-items-center"
                >
                  <div>
                    <p class="_margin-0">Next meeting:</p>
                    <p class="_margin-0">{{ niceDate(tut.first_date) }}</p>
                  </div>
                  <i-button
                    outline
                    variant="primary"
                    circle
                    style="width: 35px; height: 35px"
                    ><i-icon icon="chevron-right"
                  /></i-button>
                </div>
              </template>
            </i-card>
          </div>
          <div class="_clearfix">
            <i-button variant="primary" class="_float-right _margin-top-1"
              >see all >></i-button
            >
          </div>
        </div>
      </i-column>
    </i-row>
    <i-row v-if="false" top-xs class="_padding-1">
      <i-column xs="12">
        <h1 class="_font-weight-bold">Recommended tutorials</h1>
        <div
          class="_border _border-color-gray-70 _rounded _padding-1 _padding-y-1"
        >
          <div
            class="_display-flex _justify-content-space-between _align-content-stretch"
          >
            <i-card style="width: 320px" class="_margin-right-1">
              <template slot="header">
                <div
                  class="_display-flex _justify-content-space-between _align-items-center"
                >
                  <div>
                    <h5
                      class="_margin-y-0 _a _text-truncate _font-weight-bold"
                      style="max-width: 150px"
                    >
                      Tutorial's Title<span
                        style="color: green; font-size: 2rem"
                        >•</span
                      >
                    </h5>
                    <p class="_margin-0">A.f.I.</p>
                  </div>
                  <img
                    slot="image"
                    src="../assets/defUser.png"
                    alt="Card Image"
                    style="width: 35px"
                  />
                </div>
              </template>
              If there is an announcement, last announcement. If not, if there
              is feed, last feed. If not, if there is a document, the document.
              If nothing, the description.
              <template slot="footer">
                <div
                  class="_display-flex _justify-content-space-between _align-items-center"
                >
                  <div>
                    <p class="_margin-0">Next meeting:</p>
                    <p class="_margin-0">18/11/2000, 15:30.</p>
                  </div>
                  <i-button
                    outline
                    variant="primary"
                    circle
                    style="width: 35px; height: 35px"
                  >
                    <i-icon icon="chevron-right" />
                  </i-button>
                </div>
              </template>
            </i-card>
            <i-card style="width: 320px" class="_margin-right-1">
              <template slot="header">
                <div
                  class="_display-flex _justify-content-space-between _align-items-center"
                >
                  <div>
                    <h5
                      class="_margin-y-0 _a _text-truncate _font-weight-bold"
                      style="max-width: 150px"
                    >
                      Tutorial's Title<span
                        style="color: green; font-size: 2rem"
                        >•</span
                      >
                    </h5>
                    <p class="_margin-0">A.f.I.</p>
                  </div>
                  <img
                    slot="image"
                    src="../assets/defUser.png"
                    alt="Card Image"
                    style="width: 35px"
                  />
                </div>
              </template>
              If there is an announcement, last announcement. If not, if there
              is feed, last feed. If not, if there is a document, the document.
              If nothing, the description.
              <template slot="footer">
                <div
                  class="_display-flex _justify-content-space-between _align-items-center"
                >
                  <div>
                    <p class="_margin-0">Next meeting:</p>
                    <p class="_margin-0">18/11/2000, 15:30.</p>
                  </div>
                  <i-button
                    outline
                    variant="primary"
                    circle
                    style="width: 35px; height: 35px"
                    ><i-icon icon="chevron-right"
                  /></i-button>
                </div>
              </template>
            </i-card>
            <i-card>
              <template slot="header">
                <div
                  class="_display-flex _justify-content-space-between _align-items-center"
                >
                  <div>
                    <h5
                      class="_margin-y-0 _a _text-truncate _font-weight-bold"
                      style="max-width: 150px"
                    >
                      Tutorial's Title<span
                        style="color: green; font-size: 2rem"
                        >•</span
                      >
                    </h5>
                    <p class="_margin-0">A.f.I.</p>
                  </div>
                  <img
                    slot="image"
                    src="../assets/defUser.png"
                    alt="Card Image"
                    style="width: 35px"
                  />
                </div>
              </template>
              If there is an announcement, last announcement. If not, if there
              is feed, last feed. If not, if there is a document, the document.
              If nothing, the description.
              <template slot="footer">
                <div
                  class="_display-flex _justify-content-space-between _align-items-center"
                >
                  <div>
                    <p class="_margin-0">Next meeting:</p>
                    <p class="_margin-0">18/11/2000, 15:30.</p>
                  </div>
                  <i-button
                    outline
                    variant="primary"
                    circle
                    style="width: 35px; height: 35px"
                    ><i-icon icon="chevron-right"
                  /></i-button>
                </div>
              </template>
            </i-card>
          </div>
          <div class="_clearfix">
            <i-button variant="primary" class="_float-right _margin-top-1"
              >see all >></i-button
            >
          </div>
        </div>
      </i-column>
    </i-row>
    <i-modal v-model="cosEdit">
      <template slot="header">Find a course of study for searching</template>
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

export default {
  data() {
    return {
      queryText: "",
      showFilters: false,
      checked: ["filterTutorials", "filterLectures", "filterPeople"],
      results: {},
      queryLoaded: false,
      queryAllCoS: false,
      currentCoS: "",
      searching: false,
      cosEdit: false,
      queryTextCoS: "",
      allCoS: [],
      showCoSDropdown: true,
      showToaster: false,
    };
  },
  methods: {
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
        (c) => strsim.compareTwoStrings(this.queryTextCoS, c.verbose_name) > 0.2
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
      axios
        .get(
          "http://localhost:3000/explore/search/" +
            this.queryText +
            "/60a2ea2699da64be41a8676a",
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
      if (text.length >= 4) {
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