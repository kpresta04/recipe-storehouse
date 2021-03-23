<template>
  <div class="container">
    <h1>My Recipes</h1>
    <div class="recipeList">
      <RecipeCard
        v-for="(recipe, i) in recipeList"
        v-on:deleteRecipe="deleteRecipe"
        :key="i"
        :source="recipe.sourceURL"
        :recipe_id="recipe.id"
      >
        <template v-slot:cardTitle>
          <v-card-title class="headline">
            Add to Shopping List
          </v-card-title>
        </template>
        <template v-slot:image>
          <v-img :src="recipe.imageURL" max-height="200px"></v-img>
        </template>
        <template v-slot:title>
          {{ recipe.title }}
        </template>
        <template v-slot:servings> Serves {{ recipe.servings }} </template>
        <template v-slot:link>
          <v-btn
            nuxt
            :to="'/my-recipes/' + recipe.id"
            color="teal darken-2"
            text
          >
            View Recipe
          </v-btn>
        </template>
      </RecipeCard>
    </div>
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
  methods: {
    async deleteRecipe(id: number) {
      const filteredList = this.recipeList.filter(
        (recipe: any) => recipe.id !== id
      );
      this.recipeList = filteredList;
      // delRecipe(id, this.$store);
    }
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
    )
      .then(res => {
        // console.log(res);
        return res.json();
      })
      .catch(err => {
        localStorage.removeItem("accessToken");
        store.commit("SET_TOKEN", null);

        throw err;
      });

    // console.log(data);
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
  max-width: 1580px;
  margin: 0 auto;
}
.card-link {
  color: teal;
  text-decoration: none;
  text-transform: capitalize;
}
</style>
