<template>
  <h1>{{ this.slug }}</h1>
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
  }
});
</script>

<style scoped></style>
