<template>
  <div class="_display-flex _flex-direction-column _justify-content-start">
    <i-form
      class="_margin-x-4 _diplay-flex _flex-direction-column _width-25"
      @submit.prevent="handleSubmit"
      accept-charset="UTF-8"
      method="post"
    >
      <i-textarea v-model="comment_content" :placeholder="place_holder" />
      <div class="_display-flex _justify-items-center">
        <i-select
          v-on:change="place_holder = typ === 'ask' ? '🤔' : '🤓'"
          v-model="typ"
        >
          <i-select-option :value="'ask'" label="ask" />
          <i-select-option :value="'say'" label="say" />
        </i-select>
        <i-select v-model="to">
          <i-select-option value="CLASS" label="to the class" />
          <i-select-option value="TUTOR" label="to the tutor" />
          <i-select-option value="ALL" label="to all" />
        </i-select>
        <i-button><i class="paper plane icon"></i></i-button>
      </div>
    </i-form>
    <div class="_margin-x-4" id="task-comments">
      <feed-item
        @reloadComments="reloadComment()"
        v-bind:key="comment._id"
        v-for="comment in comments"
        :comment="comment"
      />
    </div>
  </div>
  <!-- <div class="flex flex-col justify-start sm:grid sm:grid-cols-2 sm:gap-4">
    <form
      class="flex sm:row-span-1 flex-col justify-items-start mb-4"
      @submit.prevent="handleSubmit"
      accept-charset="UTF-8"
      method="post"
    >
      <br />
      <t-textarea
        class="text-black w-full p-4 mb-4 rounded-lg focus:shadow-outline text-lg"
        :placeholder="place_holder"
        v-model="comment_content"
        variant="comment"
        spellcheck="false"
      ></t-textarea>
      <div class="flex flex-row justify-items-center">
        <t-select
          class="text-sm"
          v-model="typ"
          variant="comment"
          @change="place_holder = typ === 'ask' ? '🤔' : '🤓'"
          :options="['ask', 'say']"
        ></t-select>
        <t-select
          class="text-sm ml-1"
          v-model="to"
          variant="comment"
          :options="[
            { text: 'to the class', value: 'CLASS' },
            { text: 'to the tutor', value: 'TUTOR' },
            { text: 'to all', value: 'ALL' },
          ]"
        ></t-select>
        <t-button class="ml-1 w-1/2"><i class="paper plane icon"></i></t-button>
      </div>
    </form>

    <div id="task-comments" class="sm:row-span-1">
      <feed-item
        @reloadComments="reloadComment()"
        v-bind:key="comment._id"
        v-for="comment in comments"
        :comment="comment"
      />
    </div>
  </div> -->
</template>
<script>
import axios from "axios";
import FeedItem from "./FeedItem.vue";
export default {
  components: { FeedItem },
  props: {
    tutorialId: String,
    isTutor: { type: Boolean, default: false },
    isStudent: { type: Boolean, default: false },
    scope: { type: String, default: "global" },
  },
  data() {
    return {
      comments: [],
      comment_content: "",
      place_holder: "🤔",
      to: "CLASS",
      typ: "ask",
    };
  },
  async mounted() {
    this.grabComments();
  },
  methods: {
    getScope() {
      return this.isTutor ? "tutor" : this.isStudent ? "student" : "global";
    },
    reloadComment() {
      this.grabComments();
    },
    handleSubmit: async function postComment() {
      try {
        let comment = {
          value: this.comment_content,
          userId: localStorage.getItem("userID"),
          isAsk: this.typ === "ask" ? true : false,
          visibility: this.to,
        };
        console.log(comment);
        var res = await axios.post(
          "http://localhost:3000/discussion/" + this.tutorialId,
          comment,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
            },
          }
        );
        if (res.status === 200) {
          this.grabComments();
          this.comment_content = "";
        }
      } catch (err) {
        alert("An error occured: ", err);
      }
      return false;
    },
    async grabComments() {
      try {
        const jwt_token = localStorage.getItem("jwt_token");
        console.log(jwt_token);
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
            result = await axios.get(
              "http://localhost:3000/discussion/" + this.tutorialId,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
                  Scope: this.scope,
                },
              }
            );
            this.comments = result.data;
          }
        } else {
          console.log("You are not authorized to access this page");
          localStorage.clear();
          this.$router.push("/login");
          this.$root.$refs.Navbar.reloadNav();
          console.log("Logged out");
        }
      } catch (err) {
        console.log(err.message);
        localStorage.clear();
        this.$router.push("/login");
        this.$root.$refs.Navbar.reloadNav();
        console.log("Logged out");
      }
    },
  },
};
</script>
