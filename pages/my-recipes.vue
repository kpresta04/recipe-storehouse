<template>
  <div class="recipeList">
    <RecipeCard :key="recipe.id" v-for="recipe in recipeList">
      <template v-slot:image>
        <v-img :src="recipe.imageURL" height="200px"></v-img>
      </template>
      <template v-slot:title>
        {{ recipe.title }}
      </template>
      <template v-slot:servings> Serves {{ recipe.servings }} </template>
    </RecipeCard>
  </div>
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

<style lang="scss" scoped>
.recipeList {
  display: flex;
}
</style>
