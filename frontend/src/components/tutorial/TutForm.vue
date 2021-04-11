<template>
  <i-container>
    <i-row>
      <i-column
        xl="6"
        lg="8"
        md="10"
        sm="12"
        xs="12"
        class="_margin-x-auto _margin-bottom-1"
        ><i-alert variant="warning" :show="showAlert">
          <p>All fields are required! Please fill {{ oblig }}.</p>
        </i-alert></i-column
      >
    </i-row>
    <i-row>
      <i-column
        xl="4"
        lg="6"
        md="6"
        sm="8"
        xs="12"
        class="_margin-x-auto _background-gray-20 _padding-1"
      >
        <form @submit.prevent="checkForm" method="POST">
          <i-form-group>
            <i-form-label>Lecture</i-form-label>
            <i-select v-model="lecture" placeholder="Choose a lecture">
              <i-select-option
                v-for="lec in lectures"
                :key="lec.value"
                :value="lec.value"
                :label="lec.text"
              />
            </i-select>
          </i-form-group>

          <i-form-group>
            <i-form-label>Title</i-form-label>
            <i-input
              v-model="title"
              placeholder="An utmost brief description."
            />
          </i-form-group>

          <i-form-group>
            <i-form-label>Frequency</i-form-label>
            <i-select v-model="frequency" placeholder="Tutorial's scheduling">
              <i-select-option
                v-for="freq in frequencies"
                :key="freq"
                :value="freq"
                :label="freq"
              />
            </i-select>
          </i-form-group>

          <i-form-group>
            <i-form-label>Class size</i-form-label>
            <i-input-number
              v-model="classsize"
              :min="1"
              :max="15"
              placeholder="1 to 15.."
            />
          </i-form-group>

          <i-form-group>
            <i-form-label>Select date</i-form-label>: 
            <flat-pickr v-model="firstdate" :config="{minDate: Date(), altInput: true, dateFormat: 'Z', altFormat: 'j.n.Y, H:i:S.', enableTime: true, time_24hr: true}"></flat-pickr>
          </i-form-group>
          <i-form-group>
            <i-form-label>Description</i-form-label>
            <i-textarea
              v-model="description"
              placeholder="Tell your future students about your tutorial in detail. You can update this anytime you like."
            />
          </i-form-group>
          <i-form-group>
            <i-button variant="primary" type="submit"
              ><i-icon  icon="plus" class="_margin-right-1" size="sm" />Create
              new tutorial</i-button
            >
          </i-form-group>
        </form>
      </i-column>
    </i-row>
  </i-container>

  <!-- <div>
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
  </div> -->
</template>

<script>
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import axios from "axios";

export default {
  components: { flatPickr },
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
      classsize: 1,
      description: "",
      lecture: "",
      lectures: [],
      frequencies: ["WEEKLY", "MONTHLY", "IRREGULAR", "ONE-SHOT"],
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
          tutor: localStorage.getItem("userID"),
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
        this.$router.push({ name: "tutorials" });
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