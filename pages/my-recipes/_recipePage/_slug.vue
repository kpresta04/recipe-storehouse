<template>
  <div>
    <v-img
      v-if="this.recipe && this.recipe.imageURL"
      max-height="150"
      max-width="250"
      :src="this.recipe.imageURL"
    ></v-img>
    <h1>{{ this.recipe && this.recipe.title }}</h1>
    <h3>
      Servings:
      {{ this.baseServings }}
      <!-- <input
        :value="this.baseServings"
        type="number"
        min="1"
        name="servings"
        id="servings"
      /> -->
      <!-- <v-text-field readonly :value="this.recipe.servings">
        <v-icon @click="adjustServings" slot="append" color="blue">
          mdi-plus
        </v-icon>
        <v-icon slot="prepend" color="green">
          mdi-minus
        </v-icon>
      </v-text-field> -->
      <!-- <v-btn text color="primary">
        Adjust
      </v-btn> -->
    </h3>
    <!-- <h5>Original recipe yields&nbsp;{{ this.baseServings }} servings</h5> -->
    <!-- <div class="title">
    </div> -->
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
    <h2>Tags</h2>
    <div class="tags text-center">
      <v-chip
        class="ma-2"
        close
        color="blue"
        label
        outlined
        @click:close="handleDeleteTag"
      >
        Complete
      </v-chip>
    </div>
    <h2>
      Notes
      <v-btn icon @click="showNotes = !showNotes">
        <v-icon>{{ showNotes ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </h2>
    <v-expand-transition>
      <div v-show="showNotes">
        <!-- <v-card-text> -->
        <v-textarea
          :value="this.recipe.notes.length > 0 ? this.recipe.notes[0].text : ''"
          @input="handleChange"
          id="notes"
          outlined
          shaped
        ></v-textarea>
        <div>
          <v-btn
            @click="handleSave"
            :disabled="!this.textChanged"
            color="primary"
          >
            Save
          </v-btn>
          <v-btn @click="handleDeleteNote" color="error">
            Delete
          </v-btn>
        </div>
        <!-- </v-card-text> -->
      </div>
    </v-expand-transition>
    <h2>Options</h2>
    <v-row align="center">
      <v-btn class="ma-2" color="primary" dark>
        Add to Shopping List
        <v-icon dark right>
          mdi-cart
        </v-icon>
      </v-btn>

      <v-btn dark class="ma-2" color="teal">
        Add to Meal Plan
        <v-icon right> mdi-calendar </v-icon>
      </v-btn>
      <v-btn class="ma-2" color="red" dark>
        Delete
        <v-icon dark right>
          mdi-delete
        </v-icon>
      </v-btn>

      <v-btn :to="'/my-recipes/' + this.slug + '/print'" class="ma-2">
        Print
        <v-icon dark right>
          mdi-printer
        </v-icon>
      </v-btn>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  middleware: "authenticated",
  data() {
    return {
      slug: null,
      recipe: {
        id: 0,
        servings: 0
      },
      showMethod: false,
      showIngredients: true,
      showNotes: false,
      textChanged: false
    };
  },
  methods: {
    async handleDeleteTag() {
      console.log("delete tag");
    },
    handleChange() {
      if (!this.textChanged) {
        this.textChanged = true;
      }
    },
    adjustServings() {
      console.log("honkey");
      this.recipe.servings++;
    },
    async handleDeleteNote() {
      // const recipeId = this.recipe.id;

      try {
        const response = await fetch(`/api/note/${this.slug}`, {
          method: "DELETE", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
            accessToken: this.$store.state.accessToken
          }
        });

        const textArea = <HTMLInputElement>document.querySelector("#notes");
        textArea.value = "";
      } catch (error) {
        console.log(error);
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
          // console.log(response);
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

    return {
      slug,
      recipe: recipeInfo,
      showNotes: recipeInfo.notes.length > 0 ? true : false,
      baseServings: recipeInfo.servings
    };
  }
});
</script>

<style lang="scss" scoped>
input {
  max-width: 4rem !important;
}
h3 {
  color: gray;
}
.title {
  margin-top: 1rem;
}
.tags {
  display: flex;
  flex-wrap: wrap;
}
</style>
