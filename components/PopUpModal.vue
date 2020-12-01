<template>
  <v-dialog v-model="dialog" max-width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="ma-2" :color="color" dark v-bind="attrs" v-on="on">
        {{ buttonText }}
        <slot name="buttonIcon" />
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">
        Add to Shopping List
      </v-card-title>
      <v-card-text
        >Servings:
        <input
          type="number"
          :value="baseServings"
          min="1"
          name="servingAmount"
          id="servingAmount"
          @change="adjustIngredients"
        />

        <ul>
          <li v-for="(ingredient, i) in recipe.extendedIngredients" :key="i">
            <v-checkbox
              class="checkBoxRow"
              v-model="selected"
              checked
              :label="ingredient.calculated"
              :value="ingredient.calculated"
            ></v-checkbox>
          </li>
        </ul>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="black darken-1" text @click="dialog = false">
          Cancel
        </v-btn>
        <v-btn color="green darken-1" text @click="dialog = false">
          Agree
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      dialog: false,
      selected: [""]
    };
  },
  mounted() {
    this.selected = [];
    this.recipe.extendedIngredients.forEach((ingredient: any) => {
      ingredient.calculated = ingredient.originalString;
      this.selected.push(ingredient.originalString);
    });
  },
  methods: {
    adjustIngredients(e: any) {
      if (e.target.value > 0) {
        const servings = e.target.value;
        this.recipe.extendedIngredients.forEach((ingredient: any) => {
          const servingRatio = servings / this.baseServings;
          const amount = ingredient.amount * servingRatio;
          const measure =
            amount > 1 ? ingredient.measures.us.unitShort : ingredient.unit;

          ingredient.calculated =
            amount + " " + measure + " " + ingredient.originalName;
          console.log(ingredient.calculated);
        });
      }
    }
  },
  props: ["color", "buttonText", "recipe", "baseServings"]
});
</script>

<style lang="scss" scoped>
ul {
  list-style-type: none;
  padding: 0;
}
.v-input--checkbox {
  margin: 0;
  padding: 0;
}
</style>
