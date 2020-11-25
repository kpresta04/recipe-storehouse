<template>
  <div class="recipeList">
    <RecipeCard
      v-for="(recipe, i) in recipeList"
      v-on:deleteRecipe="deleteRecipe"
      :key="i"
      :source="recipe.sourceURL"
      :recipe_id="recipe.id"
    >
      <template v-slot:image>
        <v-img :src="recipe.imageURL" height="200px"></v-img>
      </template>
      <template v-slot:title>
        {{ recipe.title }}
      </template>
      <template v-slot:servings> Serves {{ recipe.servings }} </template>
      <template v-slot:link>
        <v-btn nuxt :to="'/my-recipes/' + recipe.id" color="teal darken-2" text>
          View Recipe
        </v-btn>
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
  methods: {
    async deleteRecipe(id: Number) {
      const filteredList = this.recipeList.filter(
        (recipe: any) => recipe.id !== id
      );
      this.recipeList = filteredList;
      try {
        const response = await fetch(`/api/recipe/${id}`, {
          method: "DELETE", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
            accessToken: this.$store.state.accessToken
          }
        }).then(res => res.json());
        console.log(response);
      } catch (error) {
        console.log(error);
      }
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
