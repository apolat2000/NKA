<template>
  <i-card class="_margin-top-1">
    <template slot="header">
      <i-container>
        <i-row middle-xs>
          <i-column xs="4">
            <i-tooltip
              v-if="imgURI && isEditable"
              placement="bottom"
              variant="dark"
            >
              <img
                :src="imgURI"
                alt="An error occured!"
                class="_border _rounded-circle _width-100"
                @click="tellViewClickedOnPp"
                style="cursor: pointer"
              />
              <template slot="body"
                >Click to edit your profile picture.</template
              >
            </i-tooltip>

            <img
              v-if="imgURI && !isEditable"
              :src="imgURI"
              alt="An error occured!"
              class="_border _rounded-circle _width-100"
            />
          </i-column>
          <i-column
            xs="8"
            class="_display-flex _flex-direction-column _justify-content-center"
          >
            <h1 class="_text-center _margin-bottom-0">
              {{ first_name }} {{ last_name }}
            </h1>
            <h4 class="_text-center _margin-y-0">@{{ username }}</h4>
            <h6 style="margin-top: 5px;" class="_text-center">{{ course_of_study[0] }}</h6>
          </i-column>
        </i-row>
      </i-container>
    </template>
    <i-list-group :bordered="false">
      <i-list-group-item v-if="isEditable">
        <i-tooltip placement="bottom" variant="dark">
          <p @click="tellViewClickedOnBioEdit()" style="cursor: pointer">
            {{ bio === "" ? "no bio" : bio }}
          </p>
          <template slot="body">Click to edit your bio.</template>
        </i-tooltip>
      </i-list-group-item>

      <i-list-group-item v-else>
        <p>{{ bio }}</p>
      </i-list-group-item>

      <i-list-group-item>
        <p class="font-lato text-xl mb-1">
          <b>Course of study:</b> {{ course_of_study[0] }}
        </p>
      </i-list-group-item>

      <i-list-group-item>
        <p class="font-lato text-xl mt-1">
          <b>Expert in:</b> {{ expertToString(expert_of_lectures) }}
        </p>
      </i-list-group-item>
    </i-list-group>

    <template slot="footer">
      <i-collapsible v-model="active">
        <i-collapsible-item id="tut-panel">
          <template slot="title">Tutorials</template>
          <ul>
            <li class="mt-0" v-for="tutorial in tutor_in" :key="tutorial._id">
              <p @click="$router.push('/tutorials/' + tutorial._id)">
                {{ tutorial.title }}
              </p>
            </li>
          </ul>
        </i-collapsible-item>
      </i-collapsible>
    </template>
  </i-card>
</template>

<script>
//import Tooltip from "../common/Tooltip.vue";
export default {
  //components: { Tooltip },
  name: "usr-page",
  props: {
    first_name: String,
    last_name: String,
    expert_of_lectures: Array,
    course_of_study: Array,
    student_in: Array,
    username: String,
    imgURI: {
      type: String,
      default: "http://localhost:3000/profilepics/defUser.png",
    },
    bio: String,
    isEditable: Boolean,
    tutor_in: Array,
  },
  data() {
    return {
      expertString: "",
      showPhotoDesc: false,
      showBioDesc: false,
      active: ["tut-panel"],
    };
  },
  methods: {
    tellViewClickedOnPp: function () {
      this.$emit("clickedOnPp");
    },
    tellViewDeletedPp: function () {
      this.$emit("deletedPp");
    },
    expertToString: function (expert_of_lectures) {
      var returnStr = "";
      expert_of_lectures.forEach((lec) => {
        returnStr += returnStr + lec.title + ", ";
      });
      returnStr = returnStr.slice(0, -2) + ".";

      return returnStr;
    },
    tellViewClickedOnBioEdit: function () {
      this.$emit("clickedOnBioEdit");
    },
  },
};
</script>