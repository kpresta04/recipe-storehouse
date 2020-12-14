<template>
  <div class="main">
    <h1>{{ recipe.title }}</h1>
    <h4>Servings: {{ recipe.servings }}</h4>
    <h3>Ingredients</h3>
    <ul>
      <li v-for="(ingredient, i) in recipe.extendedIngredients" :key="i">
        {{ ingredient.originalString }}
      </li>
    </ul>
    <div class="notesDiv" v-if="recipe.notes.length > 0">
      <h3>Notes</h3>
      <ul>
        <li>{{ recipe.notes[0].text }}</li>
      </ul>
    </div>
    <h3>Method</h3>
    <ol>
      <li v-for="(step, i) in recipe.analyzedInstructions[0].steps" :key="i">
        {{ step.step }}
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  middleware: "authenticated",
  layout: "print",
  // mounted() {
  //   console.log( this.$route.params.recipePage);
  // },
  async asyncData({ params, store }) {
    const recipeId = Number(params.recipePage); // When calling /abc the slug will be "abc"
    const recipeInfo = await fetch(`/api/recipe/${recipeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accessToken: store.state.accessToken
      }
    }).then(res => res.json());
    let recipe;
    if (recipeInfo.tags.length > 0) {
      recipe = { ...recipeInfo, tags: recipeInfo.tags[0].tagList };
    } else {
      recipe = recipeInfo;
    }
    console.log(recipe);

    return {
      recipe
    };
  },
  mounted() {
    // window.print();
  }
});
</script>

<style lang="scss" scoped>
h4 {
  color: gray;
}
.main {
  margin: 1rem 1rem 1rem 2rem;
}
li,
h3 {
  margin-top: 0.3rem;
}
.notesDiv {
  li {
    margin-top: 0;
  }
}
</style>
