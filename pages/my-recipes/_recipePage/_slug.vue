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

    <ToolBar
      v-on:changeTag="handleChangeTag"
      :tags="this.recipe.tags.length > 0 ? this.recipe.tags : []"
    />
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
      <PopUpModal
        :recipe="recipe"
        :baseServings="baseServings"
        color="primary"
        buttonText="Add to Shopping List"
      >
        <template v-slot:cardTitle>
          <v-card-title class="headline">
            Add to Shopping List
          </v-card-title>
        </template>
        <template v-slot:cardActions>
          <v-btn class="actionButton" color="black darken-1" text>
            Cancel
          </v-btn>
          <v-btn
            id="addListBtn"
            class="actionButton"
            color="green darken-1"
            text
          >
            Add to Shopping List
          </v-btn>
        </template>
        <template v-slot:buttonIcon>
          <v-icon dark right>
            mdi-cart
          </v-icon>
        </template>
      </PopUpModal>
      <!-- <v-btn @click="handleShoppingListAdd" class="ma-2" color="primary" dark>
        Add to Shopping List
        <v-icon dark right>
          mdi-cart
        </v-icon>
      </v-btn> -->

      <v-btn dark class="ma-2" color="teal">
        Add to Meal Plan
        <v-icon right> mdi-calendar </v-icon>
      </v-btn>
      <v-btn @click="handleDeleteRecipe" class="ma-2" color="red" dark>
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
      <v-btn
        dark
        :href="this.recipe.sourceURL"
        color="purple"
        class="ma-2"
        target="_blank"
        rel="noopener"
      >
        View Source
        <v-icon dark right>
          mdi-web
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
      baseServings: 0,

      slug: null,
      recipe: {
        id: 0,
        servings: 0,
        tags: <any>[]
      },
      showMethod: false,
      showIngredients: true,
      showNotes: false,
      textChanged: false
    };
  },
  methods: {
    async handleDeleteTag(tag: string) {
      this.recipe.tags = this.recipe.tags.filter(
        (tagText: string) => tagText !== tag
      );
    },
    async handleShoppingListAdd() {
      try {
        const response = await fetch("/api/shopping-list", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
            accessToken: this.$store.state.accessToken
          }
          // body: JSON.stringify({ tagList: select })
        }).then(res => res.json());
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    async handleChangeTag(select: string[]) {
      // console.log(select);
      if (select.length > 0) {
        try {
          const response = await fetch(`/api/recipe/${this.slug}/tag`, {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
              accessToken: this.$store.state.accessToken
            },
            body: JSON.stringify({ tagList: select })
          }).then(res => res.json());
          // console.log(response);
          this.recipe.tags = response.tagList;

          // if (this.recipe.tags.length > 0) {
          //   this.recipe.tags[0].tagList = response.tagList;
          // } else {
          //   this.recipe.tags = response;
          // }

          // this.recipe.tags = select;
        } catch (error) {
          console.log(error);
        }
      } else {
        this.recipe.tags = [];
        try {
          const response = await fetch(`/api/recipe/${this.slug}/tag`, {
            method: "DELETE", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
              accessToken: this.$store.state.accessToken
            }
          });

          // console.log(response);

          // this.recipe.tags = select;
        } catch (error) {
          console.log(error);
        }
      }
    },
    async handleDeleteRecipe() {
      try {
        const response = await fetch(`/api/recipe/${this.slug}`, {
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
    let recipe;
    if (recipeInfo.tags.length > 0) {
      recipe = { ...recipeInfo, tags: recipeInfo.tags[0].tagList };
    } else {
      recipe = recipeInfo;
    }
    console.log(recipe);

    return {
      slug,
      recipe,
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
