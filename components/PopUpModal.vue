<template>
  <v-dialog v-model="dialog" max-width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-if="outlined"
        class="ma-2"
        outlined
        :color="color"
        dark
        v-bind="attrs"
        v-on="on"
      >
        {{ buttonText }}
        <slot name="buttonIcon" />
      </v-btn>
      <v-btn v-else class="ma-2" :color="color" dark v-bind="attrs" v-on="on">
        {{ buttonText }}
        <slot name="buttonIcon" />
      </v-btn>
    </template>
    <v-card>
      <slot name="cardTitle" />
      <slot name="cardBody" />
      <!-- <v-card-text
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
              :value="ingredient.id"
            ></v-checkbox>
          </li>
        </ul>
      </v-card-text> -->
      <v-card-actions>
        <!-- <v-spacer></v-spacer> -->
        <slot name="cardActions" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import dayjs from "dayjs";
export default Vue.extend({
  data() {
    return {
      dialog: false,
      selected: [""],
      selectedObj: []
    };
  },
  mounted() {
    this.selected = [];
    this.recipe.extendedIngredients.forEach((ingredient: any) => {
      ingredient.calculated = ingredient.originalString;
      this.selected.push(ingredient.id);
    });
    document.addEventListener("click", this.closeDialog);
    // console.log("mounted");
  },
  destroyed() {
    document.removeEventListener("click", this.closeDialog);
    // console.log("destro");
  },
  methods: {
    selectRecipe(rec: any) {
      this.selected = rec;
    },

    closeDialog(e: any) {
      // console.log(e);
      if (
        e.target.id === "addListBtn" ||
        e.target.parentElement.id === "addListBtn"
      ) {
        this.addToShoppingList();
      } else if (
        e.target.classList.contains("actionButton") ||
        e.target.parentElement.classList.contains("actionButton")
      ) {
        this.dialog = false;
      }
    },
    checkChanged(e: any) {
      this.selected = e;
      if (this.selectedObj.length > 0) {
      }
      console.log(this.selected);
    },
    adjustIngredients() {
      const gcd = (a: number, b: number): number => {
        if (b < 0.0000001) return a; // Since there is a limited precision we need to limit the value.

        return gcd(b, Math.floor(a % b)); // Discard any fractions due to limitations in precision.
      };
      const servingAmountEl = <HTMLInputElement>(
        document.querySelector("#servingAmount")
      );
      const servings = Number(servingAmountEl.value);
      if (servings > 0) {
        this.recipe.servings = servings;
        let newSelected: any = [];

        this.recipe.extendedIngredients.forEach(
          (ingredient: any, i: number) => {
            const servingRatio = servings / this.baseServings;
            const amount = ingredient.amount * servingRatio;
            const aisle = ingredient.aisle;
            const measure =
              ingredient.unit !== ""
                ? ingredient.unit
                : ingredient.measures.us.unitLong;
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
              newSelected.push(ingredient.id);
            }
            ingredient.calculated = newCalc;
          }
        );
        this.selected = newSelected;
      }
    },
    async addToShoppingList() {
      let newSelectedObj: any = [];
      const servingAmountEl = <HTMLInputElement>(
        document.querySelector("#servingAmount")
      );
      const servings = Number(servingAmountEl.value);
      this.recipe.extendedIngredients.forEach((ingredient: any, i: number) => {
        const servingRatio = servings / this.baseServings;
        const amount = ingredient.amount * servingRatio;
        const aisle = ingredient.aisle;
        const measure =
          ingredient.unit !== ""
            ? ingredient.unit
            : ingredient.measures.us.unitLong;

        const ingObject = {
          aisle,
          string: ingredient.calculated,
          name: ingredient.name,
          id: ingredient.id,
          amount,
          measure
        };
        const checkbox = <HTMLInputElement>(
          document.querySelector(`#checkbox-${i}`)
        );
        if (checkbox.checked) {
          newSelectedObj.push(ingObject);
        }
      });

      // console.log(this.selected);

      // this.recipe.extendedIngredients.forEach((ingredient: any, i: number) => {
      //   const checkbox = <HTMLInputElement>(
      //     document.querySelector(`#checkbox-${i}`)
      //   );
      //   if (checkbox.checked) {
      //     console.log(ingredient.calculated);
      //   }
      // });
      this.selectedObj = newSelectedObj;
      const startDate = dayjs(dayjs().day(0)).format("DD/MM/YYYY");

      try {
        const response = await fetch("/api/shopping-list", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
            accessToken: this.$store.state.accessToken
          },
          body: JSON.stringify({
            ingredients: [...newSelectedObj],
            startDate
          })
        }).then(res => res.json());
        // console.log(response);
      } catch (error) {
        console.log(error);
      }

      // console.log(this.selectedObj);
      // console.log(dayjs().day());

      this.dialog = false;
    }
  },
  props: ["color", "buttonText", "recipe", "baseServings", "outlined"]
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
.v-btn__content {
  display: none;
}
</style>
