<template>
  <i-container>
    <i-row top-xs class="_padding-1">
      <i-column xs="8">
        <h4>About</h4>
        <div
          class="_border _border-color-gray-70 _background-gray-20 _rounded _padding-1"
        >
          <p><b>Description:</b> {{ putDotAtEnd(description || "") }}</p>
          <p><b>Lecture:</b> {{ lecture.title }}.</p>
          <p><b>Class size:</b> {{ class_size }}.</p>
          <p><b>Frequency:</b> {{ frequency }}.</p>
        </div>
      </i-column>
      <i-column xs="4">
        <h4>Meeting</h4>
        <div
          class="_border _border-color-gray-70 _background-gray-20 _rounded _display-flex _flex-direction-column _align-items-center _padding-1"
        >
          <p class="my-3 text-base md:text-lg lg:text-2xl font-semibold">
            {{ niceDate(first_date_nr) }}
          </p>
          <div class="w-2/3 sm:w-1/3 my-3">
            <i-button variant="secondary">Meet!</i-button>
          </div>
        </div>
      </i-column>
    </i-row>
    <i-row top-xs class="_padding-1">
      <i-column xs="12">
        <h4>Announcements</h4>
        <div
          class="_border _border-color-gray-70 _background-gray-20 _rounded _padding-1"
        >
          <p>Here be announcements.</p>
        </div>
      </i-column>
    </i-row>
    <i-row top-xs class="_padding-1">
      <i-column xs="8">
        <h4>Documents</h4>
        <div
          class="_position-static _border _border-color-gray-70 _background-gray-20 _rounded _padding-1 _display-flex _flex-direction-row _align-items-stretch"
        >
          <div
            @mouseenter="newDocHover = true"
            @mouseleave="newDocHover = false"
            class="_width-25 _padding-1 _display-flex _flex-direction-column _justify-content-center _align-items-center"
          >
            <img src="../../assets/doc.png" class="image -thumbnail" />
            <div
              style="width: 12%; height: 36%; opacity: 0.8; cursor: pointer;"
              v-if="newDocHover"
              @click="tellViewClickedOnNewDoc"
              class="_rounded-circle _background-gray-90 _position-absolute _display-flex _flex-direction-column _justify-content-center _align-items-center"
            >
              <i-icon size="lg" icon="plus" />
            </div>
          </div>
          <div
            v-for="doc in docs"
            :key="doc._id"
            class="_width-25 _padding-1 _margin-1 _border _border-color-gray-40 _background-white _rounded _text-center"
          >
            <p>{{ doc.title }}</p>
          </div>

          <div
            v-if="docs_sliced"
            class="_width-25 _display-flex _flex-direction-column _justify-content-center"
          >
            <span class="_text-center _align-middle"><h1>...</h1></span>
          </div>
        </div>
      </i-column>
      <i-column xs="4">
        <h4>Tutor</h4>
        <div
          class="_border _border-color-gray-70 _background-gray-20 _rounded _display-flex _flex-direction-column _align-items-center _padding-1"
        >
          <h3 class="_margin-bottom-0">{{ tutor.first_name }} {{ tutor.last_name }}</h3>
          <h4 class="_margin-top-0 _margin-bottom-2 _text-gray-70">@{{tutor.username}}</h4>
          <div>
            <router-link :to="`/users/${tutor._id}`">
              <img
                v-if="imgURI"
                :src="imgURI"
                width="100"
                class="_rounded-circle"
              />
            </router-link>
          </div>
        </div>
      </i-column>
    </i-row>
  </i-container>

</template>

<script>
export default {
  name: "tut-page",
  data() {
    return {
      newDocHover: false,
    };
  },
  props: {
    students: Array,
    class_size: Number,
    tutor: Object,
    lecture: Object,
    title: String,
    first_date_nr: Number,
    frequency: String,
    description: String,
    is_active: Boolean,
    isTutor: Boolean,
    isStudent: Boolean,
    imgURI: {
      type: String,
      default: "http://localhost:3000/profilepics/defUser.png",
    },
    loaded: Boolean,
    docs: Array,
    docs_sliced: Boolean,
  },
  methods: {
    tellViewClickedOnNewDoc: function () {
      this.$emit("clickedOnNewDoc");
    },
    putDotAtEnd: function (text) {
      return text.slice(-1) === "." ? text : text + ".";
    },
    getFirstName: function () {
      return this.tutor ? this.tutor.first_name : "error";
    },
    getLastName: function () {
      return this.tutor ? this.tutor.last_name : "error";
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
  },
};
</script>

<style scoped>
.puls {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  -webkit-animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>