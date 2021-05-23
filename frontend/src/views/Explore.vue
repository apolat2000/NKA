<template>
  <i-container class="container _margin-x-0" fluid>
    <i-row top-xs class="_padding-1">
      <i-column xs="12">
        <div class="_display-flex">
          <h1 class="_font-weight-bold">Search in</h1>
          <i-tooltip placement="bottom" trigger="hover">
            <i-button
              @click="changeSearchedCoS(true)"
              style="margin-left: 1ch"
              class="_padding-0"
              ><h1>{{ userCoS.verbose_name }}</h1></i-button
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
          <li>
            <ul v-for="tut in results.tuts" :key="tut._id">
              {{
                tut.title
              }}
            </ul>
          </li>
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
        <i-form-group>
          <i-input
            class="_width-100"
            v-model="queryTextCoS"
            :placeholder="userCoS.verbose_name + '..'"
            @input="searchCoS(queryTextCoS)"
          >
            <i slot="prefix">
              <i-icon style="cursor: pointer" icon="search" />
            </i>
          </i-input>
        </i-form-group>
        <i-form-group class="_display-flex _justify-content-space-between">
          <i-button type="submit" variant="success" @click="bioAction(true)">
            Save
          </i-button>
          <!-- <i-button variant="danger" @click="bioAction(false)"
            >Discard</i-button
          > -->
        </i-form-group>
      </i-form>
    </i-modal>
  </i-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      queryText: "",
      showFilters: false,
      checked: ["filterTutorials", "filterLectures", "filterPeople"],
      results: {},
      queryLoaded: false,
      queryAllCoS: false,
      queriedCoS: "",
      userCoS: "",
      searching: false,
      cosEdit: false,
      queryTextCoS: "",
      allCoS: []
    };
  },
  methods: {
    search() {
      this.searching = true;
      console.log("searching...");
      axios
        .get(
          "http://localhost:3000/explore/search/" +
            this.queryText +
            "/60a2ea2699da64be41a8676a"
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
        console.log("hey");
      }
    },
    async changeSearchedCoS(show) {
      let result = await axios.get(
        "http://localhost:3000/courses-of-study/is-no-query/verbose_name"
      );
      if (result.status === 200) {
        this.allCoS = result.data;
        show ? (this.cosEdit = true) : (this.cosEdit = false);
      } else {
        console.log(result.status);
      }
    },
    logout() {
      localStorage.clear();
      this.$router.push("/login");
      this.reloadNav();
      console.log("Logged out");
    },
    reloadNav() {
      this.$root.$refs.Navbar.reloadNav();
    },
  },
  created() {
    //user is not authorized => Remain at login page
    let jwtToken = localStorage.getItem("jwt_token");
    if (jwtToken === null || jwtToken === "") {
      this.logout();
    }
  },
  async mounted() {
    try {
      let jwt_token = localStorage.getItem("jwt_token");
      if (jwt_token) {
        let result1 = await axios.post(
          "http://localhost:3000/verifyRefreshToken",
          {},
          {
            headers: {
              Authorization: `Bearer ${jwt_token}`,
            },
          }
        );
        if (result1.status === 200) {
          localStorage.setItem("jwt_token", result1.data.jwt_token);
          console.log("refreshed token");
        }
      }
    } catch (err) {
      console.log(err);
      this.logout();
    }
    let result2 = await axios.get(
      "http://localhost:3000/user/" +
        localStorage.getItem("userID") +
        "/courses_of_study-username"
    );
    if (result2.status === 200) {
      this.userCoS = result2.data.courses_of_study[0];
    }
  },
};
</script>
