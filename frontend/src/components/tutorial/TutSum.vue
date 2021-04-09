<template>
  <div
    class="text-white h-full mx-3 mt-8 sm:mx-8 grid grid-cols-3 gap-x-3 sm:gap-x-6 gap-y-16"
  >
    <div v-if="loaded" class="col-span-2">
      <p class="my-3 text-xl md:text-2xl lg:text-3xl font-semibold">About</p>
      <div
        class="flex flex-col justify-center border bg-indigo-800 rounded-lg min-h-full"
      >
        <p class="m-3 text-xs md:text-sm lg:text-base break-words">
          <b>Description:</b> {{ putDotAtEnd(description || "") }}
        </p>
        <p class="m-3 text-xs md:text-sm lg:text-base break-words">
          <b>Lecture:</b> {{ lecture.title }}.
        </p>
        <p class="m-3 text-xs md:text-sm lg:text-base break-words">
          <b>Class size:</b> {{ class_size }}.
        </p>
        <p class="m-3 text-xs md:text-sm lg:text-base break-words">
          <b>Type:</b> {{ frequency }}.
        </p>
        <p class="m-3 text-xs md:text-sm lg:text-base break-words">
          {{ is_active ? "Active" : "Inactive" }}.
        </p>
      </div>
    </div>
    <div v-else class="col-span-2">
      <div class="bg-gray-200 w-32 h-6 puls my-3"></div>
      <div
        class="flex flex-col justify-center border bg-indigo-800 pl-2 rounded-lg min-h-full"
      >
        <div class="bg-gray-200 w-11/12 h-6 puls my-2"></div>
        <div class="bg-gray-200 w-11/12 h-6 puls my-2"></div>
        <div class="bg-gray-200 w-11/12 h-6 puls my-2"></div>
        <div class="bg-gray-200 w-11/12 h-6 puls my-2"></div>
      </div>
    </div>
    <div v-if="loaded" class="col-span-1">
      <div v-if="isStudent || isTutor" class="w-full h-full">
        <p class="my-3 text-xl md:text-2xl lg:text-3xl font-semibold">
          Meeting
        </p>
        <div
          class="flex flex-col justify-center place-items-center border bg-indigo-800 rounded-lg min-h-full"
        >
          <p class="my-3 text-base md:text-lg lg:text-2xl font-semibold">
            {{ niceDate(first_date_nr) }}
          </p>
          <div class="w-2/3 sm:w-1/3 my-3">
            <t-button variant="yellow">Go to meeting room!</t-button>
          </div>
        </div>
      </div>
      <div v-if="!(isStudent || isTutor)" class="w-full h-full">
        <p class="my-3 text-xl md:text-2xl lg:text-3xl font-semibold">Tutor</p>
        <div
          class="flex flex-col justify-center place-items-center border bg-indigo-800 rounded-lg min-h-full"
        >
          <p class="my-2 text-base md:text-lg lg:text-2xl font-semibold">
            {{ tutor.first_name }} {{ tutor.last_name }}
          </p>
          <div class="w-2/3 sm:w-1/3">
            <router-link :to="`/users/${tutor._id}`">
              <img
                v-if="imgURI"
                :src="imgURI"
                class="w-full rounded-full shadow-xl"
              />
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="col-span-1">
      <div class="bg-gray-200 w-1/3 h-6 puls my-3"></div>
      <div
        class="flex flex-col justify-center place-items-center border bg-indigo-800 rounded-lg min-h-full"
      >
        <div class="bg-gray-200 w-2/3 h-6 puls my-3"></div>
        <div class="bg-gray-200 rounded-full w-24 h-24 puls my-3"></div>
      </div>
    </div>
    <div v-if="loaded" class="col-span-3">
      <div v-if="isStudent || isTutor" class="w-full h-full">
        <p class="mb-3 text-xl md:text-2xl lg:text-3xl font-semibold">
          Dashboard
        </p>
        <div class="border bg-indigo-800 rounded-lg min-h-full">
          <p class="m-3 text-xs md:text-sm lg:text-base break-words">
            Here be discussions and announcements.
          </p>
        </div>
      </div>
    </div>
    <div v-else class="col-span-3">
      <div v-if="isStudent || isTutor" class="w-full h-full">
        <div class="bg-gray-200 w-32 h-6 puls my-3"></div>
        <div class="border pl-2 bg-indigo-800 rounded-lg min-h-full">
          <div class="bg-gray-200 w-2/3 h-6 puls my-3"></div>
        </div>
      </div>
    </div>
    <div v-if="loaded" class="col-span-2">
      <div v-if="isStudent || isTutor" class="w-full h-full">
        <p class="my-3 text-xl md:text-2xl lg:text-3xl font-semibold">
          Documents
        </p>
        <div
          class="flex items-center justify-start border bg-indigo-800 rounded-lg min-h-full"
        >
          <div
            class="mx-1 md:mx-2 lg:ml-4 bg-gray-100 w-32 h-40 border border-black flex items-center justify-center"
            @mouseover="newDocHover = true"
            @mouseleave="newDocHover = false"
            @click="tellViewClickedOnNewDoc"
          >
            <input
              type="file"
              single
              class="hidden bg-gray-600 text-white text-sm font-semibold py-4 px-4 border border-black rounded-md shadow"
              name="doc"
              id="doc"
              accept=".pdf"
              @change="processFile($event)"
            />
            <img src="../../assets/doc.png" class="w-24" />
            <div
              v-if="isTutor || isStudent"
              :class="newDocHover ? 'block' : 'hidden'"
              class="w-16 h-16 bg-black opacity-70 rounded-full absolute flex items-center justify-center cursor-pointer"
            >
              <p class="text-4xl font-semibold select-none">+</p>
            </div>
          </div>
          <div v-for="doc in docs" :key="doc._id"
          class="mx-1 lg:mr-2 lg:ml-4 bg-gray-100 w-32 h-40 border text-black border-black flex items-center justify-center"
          > {{doc.title}}</div>
          <div v-if="docs_sliced" class="mx-1 md:mr-3 w-32 h-40 text-white text-8xl text-center">...</div>
        </div>
      </div>
      <div
        v-else
        class="flex justify-end flex-col md:flex-row col-span-3 mt-32 md:mt-16"
      >
        <div>
          <p class="my-0 text-4xl md:text-6xl lg:text-8xl font-medium">
            You are missing out on <b>a lot</b>.
          </p>
          <p class="my-0 text-2xl md:text-4xl lg:text-6xl font-medium">
            Consider joining the fun.
          </p>
        </div>
        <img src="../../assets/resources.png" class="w-full my-0" />
      </div>
    </div>
    <div v-else class="col-span-2">
      <div v-if="isStudent || isTutor" class="w-full h-full">
        <div class="bg-gray-200 w-48 h-6 puls my-3"></div>
        <div
          class="flex items-center justify-start border bg-indigo-800 rounded-lg min-h-full"
        >
          <div
            class="puls mx-1 md:mr-3 md:ml-6 bg-gray-100 w-32 h-32 border border-black rounded-2xl flex items-center justify-center"
          >
            <img src="../../assets/doc.png" class="w-24" />
          </div>
          <div
            class="puls mx-1 md:mx-3 bg-gray-100 w-32 h-32 border border-black rounded-2xl flex items-center justify-center"
          >
            <img src="../../assets/doc.png" class="w-24" />
          </div>
          <div
            class="puls mx-1 md:mx-3 bg-gray-100 w-32 h-32 border border-black rounded-2xl flex items-center justify-center"
          >
            <img src="../../assets/doc.png" class="w-24" />
          </div>
          <div
            class="puls mx-1 md:mx-3 bg-gray-100 w-32 h-32 border border-black rounded-2xl flex items-center justify-center"
          >
            <img src="../../assets/doc.png" class="w-24" />
          </div>
        </div>
      </div>
    </div>

    <div v-if="loaded" class="col-span-1">
      <div v-if="tutor && (isStudent || isTutor)" class="w-full h-full">
        <p class="my-3 text-xl md:text-2xl lg:text-3xl font-semibold">Tutor</p>
        <div
          class="flex flex-col justify-center place-items-center border bg-indigo-800 rounded-lg min-h-full"
        >
          <p class="my-2 text-base md:text-lg lg:text-2xl font-semibold">
            {{ tutor.first_name }} {{ tutor.last_name }}
          </p>
          <div class="w-2/3 sm:w-1/3">
            <router-link :to="`/users/${tutor._id}`">
              <img
                v-if="imgURI"
                :src="imgURI"
                class="w-full rounded-full shadow-xl"
              />
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="col-span-1">
      <div class="bg-gray-200 w-1/3 h-6 puls my-3"></div>
      <div
        class="flex flex-col justify-center place-items-center border bg-indigo-800 rounded-lg min-h-full"
      >
        <div class="bg-gray-200 w-2/3 h-6 puls my-3"></div>
        <div class="bg-gray-200 rounded-full w-24 h-24 puls my-3"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tut-page",
  data() {
    return {
      newDocHover: false,
    };
  },
  props: {
    students: Array,
    class_size: Number,
    tutor: Object,
    lecture: Object,
    title: String,
    first_date_nr: Number,
    frequency: String,
    description: String,
    is_active: Boolean,
    isTutor: Boolean,
    isStudent: Boolean,
    imgURI: {
      type: String,
      default: "http://localhost:3000/profilepics/defUser.png",
    },
    loaded: Boolean,
    docs: Array,
    docs_sliced: Boolean
  },
  methods: {
    tellViewClickedOnNewDoc: function () {
      this.$emit("clickedOnNewDoc");
    },
    putDotAtEnd: function (text) {
      return text.slice(-1) === "." ? text : text + ".";
    },
    getFirstName: function () {
      return this.tutor ? this.tutor.first_name : "error";
    },
    getLastName: function () {
      return this.tutor ? this.tutor.last_name : "error";
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
  },
};
</script>

<style scoped>
.puls {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  -webkit-animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>