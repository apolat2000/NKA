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
          <p>{{ alertMessage }}</p>
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
        <form @submit.prevent="handleSubmit" method="POST">
          <i-form-group>
            <i-form-label>First name</i-form-label>
            <i-input v-model="firstName" />
          </i-form-group>

          <i-form-group>
            <i-form-label>Last name</i-form-label>
            <i-input v-model="lastName" />
          </i-form-group>

          <i-form-group>
            <i-form-label>Email</i-form-label>
            <i-input v-model="email" type="email" />
          </i-form-group>

          <i-form-group>
            <i-form-label>Username</i-form-label>
            <i-input v-model="username" />
          </i-form-group>

          <i-form-group>
            <i-form-label>Password</i-form-label>
            <i-input v-model="password" type="password" />
          </i-form-group>

          <i-form-group>
            <i-form-label>Your course of study</i-form-label>
            <i-select v-model="slctCoS" placeholder="Choose an option">
              <i-select-option
                v-for="stud in studies"
                :key="stud"
                :value="stud"
                :label="stud"
              />
            </i-select>
          </i-form-group>

          <i-form-group>
            <i-form-label>Profile photo</i-form-label>
            <input
              type="file"
              single
              class="bg-gray-600 text-white text-sm font-semibold py-4 px-4 border border-black rounded-md shadow"
              name="image"
              id="image"
              accept=".png, .jpeg, .jpg"
              @change="processFile($event)"
            />
          </i-form-group>

          <i-form-group>
            <i-form-label>Your experted lectures</i-form-label>
            <i-select v-model="slctCoS" placeholder="Choose an option">
              <i-select-option
                v-for="lec in lectures"
                :key="lec.value"
                :value="lec"
                :label="lec.text"
              />
            </i-select>
          </i-form-group>

          <i-form-group>
            <i-button variant="primary" type="submit">Register</i-button>
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
    <div class="self-center w-1/3 mx-auto mb-8 md:mt-0 md:col-span-2">
      <form @submit.prevent="checkForm" method="POST">
        <div
          class="shadow bg-gradient-to-b from-blue-500 to-indigo-800 overflow-hidden sm:rounded-md"
        >
          <div class="px-4 py-5 sm:p-6">
            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6 flex">
                <div class="flex-1 mr-4">
                  <label
                    for="first-name"
                    class="font-bold font-lato block text-m text-white"
                    >First Name</label
                  >
                  <t-input id="first-name" v-model="firstName" />
                </div>
                <div>
                  <label
                    for="last-name"
                    class="font-bold font-lato block text-m text-white"
                    >Last Name</label
                  >
                  <t-input id="last-name" v-model="lastName" />
                </div>
              </div>

              <div class="col-span-6">
                <label
                  for="e-mail"
                  class="font-bold font-lato block text-m text-white"
                  >Email</label
                >
                <t-input id="email" type="email" v-model="email" />
              </div>
              <div class="col-span-6">
                <label
                  for="username"
                  class="font-bold font-lato block text-m text-white"
                  >Username</label
                >
                <t-input id="username" v-model="username" />
              </div>

              <div class="col-span-6">
                <label
                  for="password"
                  class="font-semibold block text-m text-white"
                  >Password</label
                >
                <t-input id="password" type="password" v-model="password" />
              </div>

              <div class="col-span-6">
                <label
                  for="course-of-study"
                  class="font-semibold block text-m text-white"
                  >Your Course of Study</label
                >
                <t-select
                  id="course-of-study"
                  v-model="slctCoS"
                  :options="[
                    'Informatik B.Sc.',
                    'Maschinenbau B.Sc.',
                    'Elektrotechnik B.Sc.',
                    'Informatik M.Sc.',
                  ]"
                />
              </div>

              <div class="col-span-6">
                <label for="image" class="font-semibold block text-m text-white"
                  >Your Profile Photo</label
                >
                <input
                  type="file"
                  single
                  class="bg-gray-600 text-white text-sm font-semibold py-4 px-4 border border-black rounded-md shadow"
                  name="image"
                  id="image"
                  accept=".png, .jpeg, .jpg"
                  @change="processFile($event)"
                />
              </div>

              <div class="col-span-6">
                <label
                  for="lectures"
                  class="font-semibold block text-m text-white"
                  >Your Experted Lectures</label
                >
                <t-select
                  v-model="slctLec"
                  :options="options"
                  :multiple="true"
                />
              </div>
            </div>
          </div>
          <div class="px-2 py-3 pb-8 flex justify-center sm:px-6">
            <t-button type="submit" class="px-24">Register</t-button>
          </div>
        </div>
      </form>
    </div>
  </div> -->
</template>

<script>
import axios from "axios";

export default {
  name: "RegistrationForm",
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      showAlert: false,
      oblig: "First Name",
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      slctLec: {},
      slctCoS: "",
      lectures: [],
      image: "",
      studies: [
        "Informatik B.Sc.",
        "Maschinenbau B.Sc.",
        "Elektrotechnik B.Sc.",
        "Informatik M.Sc.",
      ],
    };
  },
  created() {
    //user is not authorized => Remain at login page
    if (localStorage.getItem("jwt_token") !== null) {
      this.$router.push("/");
    } else {
      axios.get("http://localhost:3000/lectures").then((res) => {
        res.data.forEach((x) =>
          this.lectures.push({ value: x._id, text: x.title })
        );
        res.data.forEach((x) => console.log(x._id));
      });
    }
  },
  methods: {
    now: function () {
      const now = new Date();
      const date =
        now.getDate() + "." + (now.getMonth() + 1) + "." + now.getFullYear();
      const time =
        now.getHours() +
        ":" +
        (now.getMinutes() < 10 ? "0" : "") +
        now.getMinutes();
      const dateTime = date + ", " + time + ".";
      console.log(time);
      console.log(dateTime);
      return dateTime;
    },
    processFile(event) {
      this.image = event.target.files[0];
    },
    checkForm: async function createAccount() {
      if (!this.firstName) {
        this.oblig = "First Name";
        this.showAlert = true;
      } else if (!this.lastName) {
        this.oblig = "Last Name";
        this.showAlert = true;
      } else if (!this.email) {
        this.oblig = "Email";
        this.showAlert = true;
      } else if (!this.username) {
        this.oblig = "Username";
        this.showAlert = true;
      } else if (!this.password) {
        this.oblig = "Password";
        this.showAlert = true;
      } else if (!this.slctCoS) {
        this.oblig = "Course of Study";
        this.showAlert = true;
      } else {
        console.log(this.image);
        let user = {
          first_name: this.firstName,
          last_name: this.lastName,
          username: this.username,
          email: this.email,
          password: this.password,
          course_of_study: [this.slctCoS],
          expert_of_lectures: this.slctLec,
          img: this.image ? this.image : "",
          bio: "",
        };
        var formData = new FormData();
        Object.keys(user).forEach((key) => formData.append(key, user[key]));
        console.log(formData);
        try {
          let newUser = await axios.post(
            "http://localhost:3000/users",
            formData
          );
          console.log("Account created");
          localStorage.setItem("jwt_token", newUser.data.jwt_token);
          localStorage.setItem("userID", newUser.data.userID);
          localStorage.setItem("firstName", newUser.data.first_name);
          this.$router.push("/");
          this.$root.$refs.Navbar.reloadNav();
        } catch (err) {
          window.alert("Account could not be created");
          console.log(err);
        }
      }
    },
  },
};
</script>