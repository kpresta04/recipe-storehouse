<template>
  <div class="container">
    <h1>Import a recipe</h1>
    <form @submit.prevent="fetchRecipe">
      <div class="form-grp">
        <div class="input-grp">
          <label for="url">Recipe URL</label>
          <input required type="text" name="url" id="url" v-model="recipeURL" />
        </div>
        <p>{{ error }}</p>
        <v-btn type="submit" depressed color="primary"> Submit</v-btn>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  middleware: "authenticated",

  data() {
    return {
      recipeURL: "",
      error: ""
    };
  },
  methods: {
    fetchRecipe() {
      //   console.log(this.recipeURL);
      //

      fetch(
        // `https://rapidapi.p.rapidapi.com/recipes/extract?url=${this.recipeURL}`,
        "/api/import",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accessToken: this.$store.state.accessToken
          },
          body: JSON.stringify({ recipeURL: this.recipeURL })
        }
      )
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            //error handling
            this.error =
              "There was an error importing the recipe. Please try again.";
          } else {
            this.$router.push(`/my-recipes/${data.id}`);
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
});
</script>

<style lang="scss" scoped></style>
