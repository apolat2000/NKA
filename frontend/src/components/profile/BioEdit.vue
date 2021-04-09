<template>
  <div
    v-if="show"
    class="inset-center w-full h-full bg-gray-800 bg-opacity-80 z-50"
  >
    <div
      class="flex flex-col justify-center items-center w-1/2 h-1/2 bg-nkayellow inset-center border border-black rounded-2xl"
    >
      <t-textarea
        :maxlength="280"
        v-model="bioText"
        placeholder="Your bio here..."
        class="w-3/5 h-3/5 my-4"
      />
      <div class="flex flex-row items-center text-2xl my-4">
        <t-button
          variant="success"
          class="mx-4"
          @click="quitComponent(true, bioText)"
          ><i class="check icon"
        /></t-button>
        <t-button
          @click="quitComponent(false, bioText)"
          variant="error"
          class="mx-4"
          ><i class="times icon"
        /></t-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
  },
  data() {
      return {
          bioText: ''
      }
  },
  methods: {
      quitComponent: function(isSuccess, written) {
          this.$emit('closedBio', isSuccess, written)
      }
  }
};
</script>

<style scoped>
.inset-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>