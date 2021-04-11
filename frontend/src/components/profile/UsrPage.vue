<template>
  <i-card>
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
            <h4 class="_text-center _margin-top-0">@{{ username }}</h4>
          </i-column>
        </i-row>
      </i-container>
    </template>
    <i-list-group :bordered="false">
      <i-list-group-item v-if="isEditable">
        <i-tooltip placement="bottom" variant="dark">
          <p @click="tellViewClickedOnBioEdit()">{{ bio }}</p>
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

    <template slot="footer"
      ><i-collapsible>
        <i-collapsible-item>
          <template slot="title">Tutorials</template>
          <ul>
            <li class="mt-0" v-for="tutorial in tutor_in" :key="tutorial._id">
              {{ tutorial.title }}
            </li>
          </ul>
        </i-collapsible-item>
      </i-collapsible></template
    >
  </i-card>
  <!-- 
  <div class="flex justify-center text-white">
    <div
      class="grid grid-cols-3 divide-y grid-rows-4 w-11/12 sm:w-3/5 md:w-2/5 lg:w-1/3 shadow bg-gradient-to-b from-blue-700 to-indigo-800 sm:rounded-md"
    >
      <div
        class="col-span-3 row-span-2 grid gap-2 grid-cols-3 grid-rows-2 mt-4 mx-4"
      >
        <div v-if="isEditable">
          <div
            class="w-40 h-40 relative cursor-pointer"
            @mouseover="showPhotoDesc = true"
            @mouseleave="showPhotoDesc = false"
          >
            <img
              v-if="imgURI"
              :src="imgURI"
              alt="An error occured!"
              class="rounded-full shadow-xl cursor-pointer w-full"
              @click="tellViewClickedOnPp"
            />
            <div
              :class="showPhotoDesc && this.imgURI !== 'http://localhost:3000/profilepics/defUser.png' ? 'block' : 'hidden'"
              class="w-8 h-8 rounded-xl bg-black bg-opacity-50 absolute top-4 right-4 z-50 flex justify-center items-center"
              @click="tellViewDeletedPp"
            >
              <i class="trash icon"></i>
            </div>
            <tooltip
              :corpus="'Click to edit your profile picture.'"
              :hover="showPhotoDesc"
            />
          </div>
        </div>
        <div v-if="!isEditable">
          <img
            @mouseover="showPhotoDesc = true"
            @mouseleave="showPhotoDesc = false"
            v-if="imgURI"
            :src="imgURI"
            alt="An error occured!"
            class="rounded-full shadow-xl w-48"
          />
        </div>

        <div class="col-span-2 self-center">
          <p class="font-bold font-lato text-2xl text-center mb-0">
            {{ first_name }} {{ last_name }}
          </p>
          <p class="font-bold font-lato text-md text-center text-gray-300 mt-0">
            {{ username }}
          </p>
        </div>
        <div
          class="col-span-3 w-full"
          v-if="isEditable"
          @mouseover="showBioDesc = true"
          @mouseleave="showBioDesc = false"
        >
          <p
            class="w-full break-words font-lato text-l cursor-pointer"
            @click="tellViewClickedOnBioEdit()"
          >
            {{ bio }}
          </p>
          <tooltip :corpus="'Click to edit your bio.'" :hover="showBioDesc" />
        </div>
        <p
          v-if="!isEditable"
          class="w-full break-words col-span-3 font-lato text-l"
        >
          {{ bio }}
        </p>
      </div>
      <div class="col-span-3 row-span-1 m-4">
        <p class="font-lato text-xl mb-1">
          <b>Course of study:</b> {{ course_of_study[0] }}
        </p>
        <p class="font-lato text-xl mt-1">
          <b>Expert in:</b> {{ expertToString(expert_of_lectures) }}
        </p>
      </div>
      <div class="col-span-3 row-span-1 m-4">
        <p class="font-lato text-xl mt-1"><b>Tutorials:</b></p>
        <ul class="font-lato text-xl mb-0 mt-0">
          <li class="mt-0" v-for="tutorial in tutor_in" :key="tutorial._id">
            {{ tutorial.title }}
          </li>
        </ul>
      </div>
    </div>
  </div> -->
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