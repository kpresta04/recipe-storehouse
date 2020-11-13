<template>
  <div></div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      recipeList: []
    };
  },
  created: async function() {
    // console.log("created");
    const response = await fetch(
      "/api/recipes",

      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accessToken: this.$store.state.accessToken
        }
      }
    );
    const data = await response.json();
    this.recipeList = data;
    console.log(data);
  },
  mounted: function() {
    // console.log(this.recipeList);
  }
});
</script>

<style lang="scss" scoped></style>
