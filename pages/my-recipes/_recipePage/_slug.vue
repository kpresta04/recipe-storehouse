<template>
  <div>
    <v-img
      v-if="this.recipe && this.recipe.imageURL"
      max-height="150"
      max-width="250"
      :src="this.recipe.imageURL"
    ></v-img>
    <div class="title">
      <h1>{{ this.recipe && this.recipe.title }}</h1>
      <h3>
        Serves: <span v-if="this.recipe">{{ this.recipe.servings }} </span>
      </h3>
    </div>
    <h2>
      Ingredients
      <v-btn icon @click="showIngredients = !showIngredients">
        <v-icon>{{
          showIngredients ? "mdi-chevron-up" : "mdi-chevron-down"
        }}</v-icon>
      </v-btn>
    </h2>

    <v-expand-transition>
      <div v-show="showIngredients">
        <v-card-text>
          <ul>
            <li
              v-for="(ingredient, i) in this.recipe.extendedIngredients"
              :key="i"
            >
              {{ ingredient.originalString }}
            </li>
          </ul>
        </v-card-text>
      </div>
    </v-expand-transition>

    <h2>
      Method
      <v-btn icon @click="showMethod = !showMethod">
        <v-icon>{{
          showMethod ? "mdi-chevron-up" : "mdi-chevron-down"
        }}</v-icon>
      </v-btn>
    </h2>
    <v-expand-transition>
      <div v-show="showMethod">
        <v-card-text>
          <ol v-if="this.recipe">
            <li
              v-for="(step, i) in this.recipe.analyzedInstructions[0].steps"
              :key="i"
            >
              {{ step.step }}
            </li>
          </ol>
        </v-card-text>
      </div>
    </v-expand-transition>
    <h2>Notes</h2>
    <v-textarea
      :value="this.recipe.notes.length > 0 ? this.recipe.notes[0].text : ''"
      @input="handleChange"
      id="notes"
      outlined
      shaped
    ></v-textarea>
    <div>
      <v-btn @click="handleSave" :disabled="!this.textChanged" color="primary">
        Save
      </v-btn>
      <v-btn color="error">
        Delete
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  middleware: "authenticated",
  data() {
    return {
      slug: null,
      recipe: null,
      showMethod: true,
      showIngredients: true,
      textChanged: false
    };
  },
  methods: {
    handleChange() {
      if (!this.textChanged) {
        this.textChanged = true;
      }
    },
    async handleSave() {
      const textArea = <HTMLInputElement>document.querySelector("#notes");

      if (textArea.value) {
        this.textChanged = false;
        // console.log(textArea.value);
        try {
          const response = await fetch("/api/note", {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
              accessToken: this.$store.state.accessToken
            },
            body: JSON.stringify({
              recipeId: this.slug,
              text: textArea.value
            })
          }).then(res => res.json());
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      }
    }
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

<style lang="scss" scoped>
.title {
  margin-top: 1rem;
  h3 {
    color: gray;
  }
}
</style>
