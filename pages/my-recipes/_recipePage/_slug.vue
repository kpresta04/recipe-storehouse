<template>
  <div>
    <v-img
      v-if="this.recipe && this.recipe.imageURL"
      max-height="150"
      max-width="250"
      :src="this.recipe.imageURL"
    ></v-img>
    <h1>{{ this.recipe && this.recipe.title }}</h1>
    <h2>Ingredients</h2>
    <h3>
      Serves: <span v-if="this.recipe">{{ this.recipe.servings }} </span>
    </h3>
    <ul v-if="this.recipe">
      <li v-for="(ingredient, i) in this.recipe.extendedIngredients" :key="i">
        {{ ingredient.originalString }}
      </li>
    </ul>
    <h2>Method</h2>
    <ol v-if="this.recipe">
      <li
        v-for="(step, i) in this.recipe.analyzedInstructions[0].steps"
        :key="i"
      >
        {{ step.step }}
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  middleware: "authenticated",
  data() {
    return {
      slug: null,
      recipe: null
    };
  },
  async asyncData({ params, store }) {
    const slug = params.slug; // When calling /abc the slug will be "abc"
    const recipeInfo = await fetch(`/api/recipe/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accessToken: store.state.accessToken
      }
    }).then(res => res.json());
    console.log(recipeInfo);

    return { slug, recipe: recipeInfo };
  }
});
</script>

<style scoped></style>
