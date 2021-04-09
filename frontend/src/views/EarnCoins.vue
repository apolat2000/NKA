<template>
  <form @submit.prevent="checkForm" method="POST">
    <input
      type="file"
      single
      class="bg-gray-600 text-white text-sm font-semibold py-4 px-4 border border-black rounded-md shadow"
      name="doc"
      id="doc"
      accept=".pdf"
      @change="processFile($event)"
    />
    <t-button>my But</t-button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      doc: "",
    };
  },
  methods: {
    processFile(event) {
      this.doc = event.target.files[0];
      console.log(this.doc);
    },
    checkForm: function createAccount() {
      let doc = {
        title: "deneme",
        description: "desc",
        tut: "605721987597fd3a43664e31",
        visibility: "ALL",
        doc: this.doc ? this.doc : "",
      };
      var formData = new FormData();
      Object.keys(doc).forEach((key) => formData.append(key, doc[key]));
      console.log(formData);
      try {
        axios.post(
          "http://localhost:3000/docs/605721987597fd3a43664e31",
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
            },
          }
        );
      } catch (err) {
        window.alert("Account could not be created");
        console.log(err);
      }
    },
  },
};
</script>
