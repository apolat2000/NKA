<template>
  <div
    class="bg-gray-300 rounded-lg p-1 md:p-3 flex flex-col divide-y justify-start shadow-lg mb-4"
    v-if="comment.userId"
  >
    <div class="flex flex-row justify-start items-center">
      <img
        alt="avatar"
        width="48"
        height="48"
        @click="$router.push(`/users/${comment.userId._id}`)"
        class="rounded-full w-10 h-10 shadow-lg cursor-pointer"
        :src="getImage()"
      />
      <div class="flex flex-row justify-between w-full">
        <div class="flex flex-col justify-center justify-items-start ml-2">
          <p
            @click="$router.push(`/users/${comment.userId._id}`)"
            class="mb-0 cursor-pointer text-purple-800 font-semibold"
          >
            @{{ comment.userId.username }}
          </p>
          <p class="mt-0 text-gray-600">
            {{ niceDate(comment.creation_date) }}
          </p>
        </div>
        <p class="text-gray-600">Was asked<br />{{ getScope() }}.</p>
      </div>
    </div>
    <div class="my-2">
      <p class="text-black text-lg w-full text-left mb-2">
        {{ comment.value }}
      </p>

      <div v-if="isCommenter()">
        <button title="Delete Comment" @click="deleteComment()">
          <i class="trash icon" />
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: {
    comment: {},
  },
  methods: {
    getScope() {
      return this.comment.visibility === "TUTOR"
        ? "to the tutor"
        : this.comment.visibility === "CLASS"
        ? "to the class"
        : "to everyone";
    },
    niceDate: function (myDate) {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const dateObj = new Date(myDate);
      const month = monthNames[dateObj.getMonth()];
      const day = String(dateObj.getDate()).padStart(2, "0");
      const year = dateObj.getFullYear();
      const hours =
        String(dateObj.getHours()).length === 1
          ? "0" + dateObj.getHours()
          : dateObj.getHours();
      const mins =
        String(dateObj.getMinutes()).length === 1
          ? "0" + dateObj.getMinutes()
          : dateObj.getMinutes();
      const output = day + " " + month + " " + year + ", " + hours + ":" + mins;
      return output;
    },
    getImage() {
      console.log(this.comment.userId);
      console.log(this.comment.userId.img_path);
      if (this.comment.userId) {
        if (this.comment.userId.img_path) {
          console.log('hey');
          return "http://localhost:3000/" + this.comment.userId.img_path;
        }
      }
      return "https://cdn1.iconfinder.com/data/icons/technology-devices-2/100/Profile-512.png";
    },
    isCommenter() {
      return this.comment.userId._id === localStorage.getItem("userID");
    },
    async deleteComment() {
      try {
        var res = await axios.delete(
          "http://localhost:3000/discussion/" + this.$route.params.id,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
              CommentId: this.comment._id,
            },
          }
        );
        if (res.status === 200) {
          this.$emit("reloadComments");
        }
      } catch (err) {
        alert("An error occured");
        console.log(err);
      }
    },
  },
};
</script>
