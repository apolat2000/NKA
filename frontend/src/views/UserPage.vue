<template>
  <div id="user-page">
    <i-container>
      <i-row>
        <i-column xl="6" lg="8" md="10" sm="12" xs="12" class="_margin-x-auto">
          <input
            type="file"
            ref="pp"
            single
            name="img"
            accept=".png, .jpeg, .jpg"
            class="_display-none"
            @change="ppAction($event)"
          />
          <usr-page
            class="mt-24 mb-8"
            :key="profileObject._id"
            :imgURI="imgURI"
            :first_name="profileObject.first_name"
            :last_name="profileObject.last_name"
            :courses_of_study="profileObject.courses_of_study"
            :expert_of_lectures="profileObject.expert_of_lectures"
            :bio="profileObject.bio"
            :username="profileObject.username"
            :student_in="profileObject.student_in"
            :tutor_in="profileObject.tutor_in"
            :isEditable="isEditable"
            v-on:clickedOnBioEdit="bioEdit = true"
            @clickedOnPp="$refs.pp.click()"
            @deletedPp="deletePpAction"
          />
          <i-modal v-model="bioEdit">
            <template slot="header">Edit your bio</template>
            <i-form v-model="form">
              <i-form-group>
                <i-textarea
                  v-model="bioText"
                  :clearable="true"
                  :schema="form.textarea"
                  placeholder="Your bio here..."
                />
              </i-form-group>
              <i-form-group
                class="_display-flex _justify-content-space-between"
              >
                <i-button type="submit" variant="success" @click="bioAction(true)">Save</i-button>
                <i-button variant="danger" @click="bioAction(false)"
                  >Discard</i-button
                >
              </i-form-group>
            </i-form>
          </i-modal>
          <!-- <bio-edit v-on:closedBio="bioAction" :show="bioEdit" /> -->
        </i-column>
      </i-row>
    </i-container>
  </div>
</template>

<script>
import axios from "axios";
import UsrPage from "../components/profile/UsrPage.vue";
//import BioEdit from "../components/profile/BioEdit.vue";
export default {
  components: { UsrPage },
  data() {
    return {
      profileObject: {
        courses_of_study: [],
        expert_of_lectures: [],
        bio: "",
        tutor_in: [],
      },
      imgURI: "nullum",
      bioEdit: false,
      isEditable: false,
      bioText: "",
      form: this.$inkline.form({
        textarea: {
          validators: [{ rule: "maxLength", value: 280 }],
        },
      }),
    };
  },
  async mounted() {

    let routerId = this.$route.params.id;
    let usr_id = localStorage.getItem("userID");
    let jwt_token = localStorage.getItem("jwt_token");

    if (routerId === usr_id) {
      this.isEditable = true;
    } else {
      this.isEditable = false;
    }

    let resultt = await axios.get("http://localhost:3000/user/" + routerId + '/', {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    });
    this.profileObject.courses_of_study = resultt.data.courses_of_study || [];
    this.profileObject.student_in = resultt.data.student_in;
    this.profileObject.expert_of_lectures =
      resultt.data.expert_of_lectures || [];
    this.profileObject.img_path = resultt.data.img_path;
    this.profileObject.first_name = resultt.data.first_name;
    this.profileObject.last_name = resultt.data.last_name;
    this.profileObject.username = resultt.data.username;
    this.profileObject.bio = resultt.data.bio || "Your bio is empty.";
    this.profileObject.tutor_in = resultt.data.tutor_in || [];

    console.log(resultt.data);

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
    bioAction: async function (isSuccess) {
      this.bioEdit = false;
      if (isSuccess) {
        let usr_id = localStorage.getItem("userID");
        console.log(usr_id);
        var result = await axios.put(
          `http://localhost:3000/user/${usr_id}`,
          { bio: this.bioText },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
            },
          }
        );
        if (result.status === 200) {
          this.profileObject.bio = this.bioText;
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
        { img_path: "" },
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
  },
};
</script>