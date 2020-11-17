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
  data() {
    return {
      slug: null,
      recipe: null
    };
  },
  async asyncData({ params }) {
    const slug = params.slug; // When calling /abc the slug will be "abc"

    return { slug };
  },
  created: async function() {
    const recipeInfo = await fetch(`/api/recipe/${this.slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accessToken: this.$store.state.accessToken
      }
    }).then(res => res.json());

    this.recipe = recipeInfo;
    console.log(this.recipe);
  }
});
</script>

<style scoped></style>
