<template>
  <!-- <p v-if="description !== ''">{{ description }}</p> -->
  <p>amk</p>
</template>

<script>
export default {
    name: 'TutDesc',
    data() {
        return {
            description: ''
        }
    },
    props: {
        id: String
    },
    mounted: async function() {
        let resDesc = await axios.get(
          "http://localhost:3000/tutorial/" + this.id,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
              Wanted: 'description'
            },
          }
        );
        this.description = resDesc.data;
        console.log(resDesc.data);

    }
}
</script>