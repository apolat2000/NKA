<template>
  <div>
    <t-alert
      variant="danger"
      class="w-2/5 block self-center mx-auto mb-8"
      :show="showAlert"
      >All fields are required! Please fill {{ oblig }}.</t-alert
    >
    <div class="self-center w-4/5 sm:w-3/4 lg:w-1/3 mx-auto mb-8">
      <form @submit.prevent="checkForm" method="POST">
        <div class="shadow bg-gradient-to-b from-blue-700 to-indigo-800 overflow-hidden sm:rounded-md">
          <div class="px-4 py-5 sm:p-6">
            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6">
                <label
                  for="lecture"
                  class="font-semibold block text-m text-white"
                  >Lecture</label
                >
                <t-select
                  v-model="lecture"
                  placeholder=""
                  :options="lectures"
                />
              </div>
              <div class="col-span-6">
                <label
                  for="title"
                  class="font-bold font-lato block text-m text-white"
                  >Title</label
                >
                <t-input
                  v-model="title"
                  placeholder="An utmost brief description."
                />
              </div>

              <div class="col-span-6">
                <label
                  for="frequency"
                  class="font-semibold block text-m text-white"
                  >Frequency</label
                >
                <t-select
                  v-model="frequency"
                  :options="['WEEKLY', 'MONTHLY', 'IRREGULAR', 'ONE-SHOT']"
                />
              </div>

              <div class="col-span-6">
                <label
                  for="classsize"
                  class="font-bold font-lato block text-m text-white"
                  >Class Size</label
                >
                <t-input
                  v-model="classsize"
                  :min="1"
                  :max="15"
                  placeholder="A number between 1 and 15 (inclusive)."
                />
              </div>

              <div class="col-span-6">
                <label
                  for="firstdate"
                  class="font-semibold block text-m text-white"
                  >First Date & Time</label
                >
                <t-datepicker
                  v-model="firstdate"
                  date-format="Z"
                  user-format="j.n.Y, H:i:S."
                />
              </div>

              <div class="col-span-6 sm:col-span-4">
                <label
                  for="description"
                  class="font-semibold block text-m text-white"
                >
                  Description
                </label>
                <div class="mt-1">
                  <t-textarea
                    v-model="description"
                    :maxlength="400"
                    placeholder="Tell your future students about your tutorial in detail. You can update this anytime you like."
                  />
                </div>
                <!--
                <p class="mt-2 text-sm text-gray-500">
                  Brief description for your profile. URLs are hyperlinked.
                </p>
                -->
              </div>
            </div>
          </div>
          <div class="px-4 pt-3 pb-8 text-right sm:px-6">
            <t-button type="submit"
              ><i class="plus circle icon"></i>{{ buttonValue }}</t-button
            >
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    tutorial: {
      type: Object,
      default: () => {},
    },
    pageTitle: {
      type: String,
      default: "Create New Tutorial",
    },
  },
  data() {
    return {
      showAlert: false,
      oblig: "First Name",
      buttonValue: "Create Tutorial",
      title: "",
      frequency: "",
      firstdate: "01.01.0001, 00:00:00.",
      classsize: 0,
      description: "",
      lecture: "",
      lectures: [],
    };
  },
  methods: {
    now: function () {
      return new Date().toISOString();
      // const date =
      //   now.getDate() + "." + (now.getMonth() + 1) + "." + now.getFullYear();
      // const time =
      //   now.getHours() +
      //   ":" +
      //   (now.getMinutes() < 10 ? "0" : "") +
      //   now.getMinutes();
      // const dateTime = date + ", " + time + ".";
      // console.log(time);
      // console.log(dateTime);
      // return dateTime;
    },
    checkForm: async function createTutorial() {
      if (!this.lecture) {
        console.log(this.lecture);
        this.oblig = "Lecture";
        this.showAlert = true;
      } else if (!this.title) {
        this.oblig = "Title";
        this.showAlert = true;
      } else if (!this.frequency) {
        this.oblig = "Frequency";
        this.showAlert = true;
      } else if (!this.classsize) {
        this.oblig = "Class Size";
        this.showAlert = true;
      } else if (!this.firstdate) {
        this.oblig = "First Date & Time";
        this.showAlert = true;
      } else if (!this.description) {
        this.oblig = "Description";
        this.showAlert = true;
      } else {
        let tut = {
          class_size: this.classsize,
          //tutor: local storage bilmen ne,
          tutor: localStorage.getItem('userID'),
          lecture: this.lecture,
          title: this.title,
          creation_date: this.now(),
          students: [],
          first_date: this.firstdate,
          frequency: this.frequency,
          description: this.description,
          is_active: true,
        };
        console.log(tut);
        axios
          .post(`http://localhost:3000/tutorials`, tut)
          .then((response) => {
            console.log(response);
            this.$router.push("/");
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
  },
  async created() {
    this.firstdate = this.now();

    if (Object.keys(this.tutorial || {}).length !== 0) {
      this.buttonValue = "Edit Tutorial";
    }

    axios
      .get("http://localhost:3000/lectures")
      .then((response) => {
        response.data.forEach((element) => {
          this.lectures.push({ value: element._id, text: element.title });
          console.log(element._id);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>