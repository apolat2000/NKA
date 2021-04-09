<template>
  <div id="user-page">
    <input
      type="file"
      ref="pp"
      single
      name="img"
      accept=".png, .jpeg, .jpg"
      class="hidden"
      @change="ppAction($event)"
    />
    <usr-page
      class="mt-24 mb-8"
      :key="profileObject._id"
      :imgURI="imgURI"
      :first_name="profileObject.first_name"
      :last_name="profileObject.last_name"
      :course_of_study="profileObject.course_of_study"
      :expert_of_lectures="profileObject.expert_of_lectures"
      :bio="profileObject.bio"
      :username="profileObject.username"
      :student_in="profileObject.student_in"
      :tutor_in="profileObject.tutor_in"
      :isEditable="isEditable"
      v-on:clickedOnBioEdit="bioEdit = true"
      v-on:clickedOnPp="$refs.pp.click()"
      v-on:deletedPp="deletePpAction"
    />
    <bio-edit v-on:closedBio="bioAction" :show="bioEdit" />
  </div>
</template>

<script>
import axios from "axios";
import UsrPage from "../components/profile/UsrPage.vue";
import BioEdit from "../components/profile/BioEdit.vue";
export default {
  components: { UsrPage, BioEdit },
  data() {
    return {
      profileObject: {
        course_of_study: [],
        expert_of_lectures: [],
        bio: "",
        tutor_in: [],
      },
      imgURI: "nullum",
      bioEdit: false,
      isEditable: false,
    };
  },
  created() {
    //user is not authorized => Remain at login page
    if (localStorage.getItem("jwt_token") === null) {
      this.$router.push("/login");
    }
  },
  async mounted() {
    let routerId = this.$route.params.id;
    let usr_id = localStorage.getItem("userID");

    if (routerId === usr_id) {
      this.isEditable = true;
    } else {
      this.isEditable = false;
    }
    try {
      const jwt_token = localStorage.getItem("jwt_token");
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
        }
      }
    } catch (err) {
      console.log(err.message);
    }

    let resultt = await axios.get("http://localhost:3000/user/" + routerId, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
      },
    });
    this.profileObject.course_of_study = resultt.data.course_of_study || [];
    this.profileObject.student_in = resultt.data.student_in;
    this.profileObject.expert_of_lectures =
      resultt.data.expert_of_lectures || [];
    this.profileObject.img_path = resultt.data.img_path;
    this.profileObject.first_name = resultt.data.first_name;
    this.profileObject.last_name = resultt.data.last_name;
    this.profileObject.username = resultt.data.username;
    this.profileObject.bio = resultt.data.bio || "Your bio is empty.";
    this.profileObject.tutor_in = resultt.data.tutor_in || [];

    if (this.profileObject.img_path !== "") {
      if (this.profileObject.img_path.length > 0) {
        let imageResult = await axios.head(
          "http://localhost:3000/" + this.profileObject.img_path
        );
        if (imageResult.status === 200) {
          this.imgURI = "http://localhost:3000/" + this.profileObject.img_path;
        }
      }
    } else {
      this.imgURI = "http://localhost:3000/profilepics/defUser.png";
    }
  },
  methods: {
    bioAction: async function (isSuccess, bioText) {
      this.bioEdit = false;
      if (isSuccess) {
        let usr_id = localStorage.getItem("userID");
        console.log(usr_id);
        var result = await axios.put(
          `http://localhost:3000/user/${usr_id}`,
          { bio: bioText },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
            },
          }
        );
        if (result.status === 200) {
          this.profileObject.bio = bioText;
        } else {
          console.log(result);
        }
      }
    },
    ppAction: async function (event) {
      let pp = event.target.files[0];
      console.log(pp);
      let usr_id = localStorage.getItem("userID");
      let ppForm = new FormData();
      ppForm.append("img", pp);
      var result = await axios.put(
        `http://localhost:3000/user/${usr_id}`,
        ppForm,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
          },
        }
      );
      if (result.status === 200) {
        console.log("successs");
        this.profileObject.img_path = "profilepics/defUser.png";
      } else {
        console.log(result);
      }
    },
    deletePpAction: async function () {
      let usr_id = localStorage.getItem("userID");
      var result = await axios.put(
        `http://localhost:3000/user/${usr_id}`,
        { img_path: ''},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
          },
        }
      );
      if (result.status === 200) {
        console.log("successs");
        this.profileObject.img_path = "profilepics/defUser.png";
      } else {
        console.log(result);
      }
    }
  },
};
</script>