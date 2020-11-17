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
      <template v-slot:link>
        <!-- <v-btn color="teal darken-2" text> -->
        <nuxt-link
          color="teal darken-2"
          class="card-link"
          :to="'/my-recipes/' + recipe.id"
        >
          View Recipe
        </nuxt-link>
        <!-- </v-btn> -->
      </template>
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
  async asyncData({ store }) {
    // console.log("created");
    const data = await fetch(
      "/api/recipes",

      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accessToken: store.state.accessToken
        }
      }
    ).then(res => {
      // console.log(res);
      return res.json();
    });

    console.log(data);
    return { recipeList: data };
  },
  middleware: "authenticated"
});
</script>

<style lang="scss" scoped>
.recipeList {
  width: 100%;
  flex-wrap: wrap;
  display: flex;
}
.card-link {
  color: teal;
  text-decoration: none;
  text-transform: capitalize;
}
</style>
