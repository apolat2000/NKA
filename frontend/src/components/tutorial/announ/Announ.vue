<template>
  <div>
      {{ corpus }}
    <i-alert dismissible :show="alertVisible" variant="warning">
      <template slot="icon"><i-icon icon="warning"></i-icon></template>
      <p>
        Some quick example text to build on the alert title and make up the bulk
        of the alert's content.
      </p>
    </i-alert>
    <i-form
      class="_margin-x-4 _diplay-flex _flex-direction-column _width-50"
      @submit.prevent="handleSubmit"
      accept-charset="UTF-8"
      method="post"
      v-model="textArea"
    >
      <i-form-group>
        <i-textarea
          :schema="textArea.input"
          v-model="corpus"
          placeholder="Share an announcement with your students."
        />
      </i-form-group>
      <i-form-group>
      <div class="_display-flex _justify-items-center">
        <i-select v-model="variant">
          <i-select-option :value="'USUAL'" label="Usual" />
          <i-select-option :value="'INFO'" label="Info" />
          <i-select-option :value="'WARNING'" label="Warning" />
        </i-select>
        <i-select v-model="importance">
          <i-select-option value="KINDA" label="Kinda important" />
          <i-select-option value="IMPORTANT" label="Important" />
          <i-select-option value="REALLY" label="Really important" />
        </i-select>
        <i-button
          ><img style="height: 21px" src="../../../assets/lightning.png"
        /></i-button>
      </div>
      </i-form-group>
    </i-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    tutorialId: String,
    isTutor: { type: Boolean, default: false },
    isStudent: { type: Boolean, default: false },
    scope: { type: String, default: "global" },
  },
  data() {
    return {
      importance: "KINDA", // enum: ['KINDA', 'IMPORTANT', 'REALLY']
      variant: "USUAL", // enum: ['WARNING', 'INFO', 'USUAL']
      corpus: "",
      alertVisible: false,
      textArea: this.$inkline.form({
        input: {
          validators: [{ rule: "required" }, { rule: "maxLength", value: 1000 }]
        },
      }),
    };
  },
  methods: {
    handleSubmit: async function postAnnouncement() {
      if (this.corpus !== "" && this.corpus.length <= 1000) {
        try {
          let announcement = {
            corpus: this.corpus,
            userId: localStorage.getItem("userID"),
            variant: this.variant,
            importance: this.importance,
          };
          console.log(announcement);
          var res = await axios.post(
            "http://localhost:3000/announcement/" + this.tutorialId,
            announcement,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
              },
            }
          );
          if (res.status === 200) {
            this.corpus = "";
          }
        } catch (err) {
          alert("An error occured: ", err);
        }
        return false;
      }
    },
  },
};
</script>