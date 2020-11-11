<template>
  <div>
    <form @submit.prevent="fetchRecipe">
      <label for="url">Recipe URL</label>
      <input required type="text" name="url" id="url" v-model="recipeURL" />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      recipeURL: ""
    };
  },
  methods: {
    fetchRecipe() {
      //   console.log(this.recipeURL);

      fetch(
        // `https://rapidapi.p.rapidapi.com/recipes/extract?url=${this.recipeURL}`,
        "/api/import",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ recipeURL: this.recipeURL })
        }
      )
        .then(response => {
          //   console.log(response);
          return response.json();
        })
        .then(data => console.log(data))
        .catch(err => {
          console.error(err);
        });
    }
  }
});
</script>

<style lang="scss" scoped></style>
