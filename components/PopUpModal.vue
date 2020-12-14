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
          :value="recipe.servings"
          min="1"
          name="servingAmount"
          id="servingAmount"
          @change="adjustIngredients"
        />
        <h4>Original recipe yields {{ baseServings }} servings</h4>

        <ul>
          <li v-for="(ingredient, i) in recipe.extendedIngredients" :key="i">
            <v-checkbox
              class="checkBoxRow"
              v-model="selected"
              :id="'checkbox-' + i"
              checked
              :label="ingredient.calculated"
              :value="ingredient.calculated"
            ></v-checkbox>
          </li>
        </ul>
      </v-card-text>
      <v-card-actions>
        <!-- <v-spacer></v-spacer> -->
        <v-btn color="black darken-1" text @click="dialog = false">
          Cancel
        </v-btn>
        <v-btn color="green darken-1" text @click="dialog = false">
          Add
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
      const gcd = (a: number, b: number): number => {
        if (b < 0.0000001) return a; // Since there is a limited precision we need to limit the value.

        return gcd(b, Math.floor(a % b)); // Discard any fractions due to limitations in precision.
      };
      if (e.target.value > 0) {
        const servings = e.target.value;
        this.recipe.servings = servings;
        let newSelected: any = [];
        this.recipe.extendedIngredients.forEach(
          (ingredient: any, i: number) => {
            const servingRatio = servings / this.baseServings;
            const amount = ingredient.amount * servingRatio;
            const measure =
              amount > 1 && ingredient.unit !== ""
                ? ingredient.measures.us.unitLong.slice(-1) === "s"
                  ? ingredient.measures.us.unitLong
                  : ingredient.measures.us.unitLong + "s"
                : ingredient.unit.slice(-1) === "s"
                ? ingredient.unit.slice(0, -1)
                : ingredient.unit;
            let newCalc;
            if (String(amount).includes(".")) {
              const amountInt = Math.floor(amount);
              let amountDecimal = amount - amountInt;
              amountDecimal = Number(amountDecimal.toFixed(3));

              let amountFraction;
              // handle special cases
              if (amountDecimal === 0.667) {
                amountFraction = "2/3";
              } else if (amountDecimal === 0.333) {
                amountFraction = "1/3";
              } else if (amountDecimal === 0.833) {
                amountFraction = "5/6";
              } else if (amountDecimal === 0.167) {
                amountFraction = "1/6";
              } else {
                const len = amountDecimal.toString().length - 2;
                //amount is a decimal
                let denominator = Math.pow(10, len);
                let numerator = amountDecimal * denominator;
                const divisor = gcd(numerator, denominator);
                numerator /= divisor;
                denominator /= divisor;
                amountFraction =
                  Math.floor(numerator) + "/" + Math.floor(denominator);
              }

              amountFraction =
                amountInt > 0
                  ? amountInt + " " + amountFraction
                  : amountFraction;

              newCalc = amountFraction + " " + measure + " " + ingredient.name;
            } else {
              newCalc = amount + " " + measure + " " + ingredient.name;
            }

            // console.log(ingredient.calculated);
            const checkbox = <HTMLInputElement>(
              document.querySelector(`#checkbox-${i}`)
            );
            if (checkbox.checked) {
              newSelected.push(newCalc);
            }
            ingredient.calculated = newCalc;
          }
        );
        this.selected = newSelected;
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
