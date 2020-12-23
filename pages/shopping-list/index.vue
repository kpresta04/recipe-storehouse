<template>
  <div>
    <div v-for="(aisle, i) in aisleListWithIngredients" :key="i">
      <h4>{{ aisle.aisle }}</h4>

      <div v-for="(ingredient, index) in aisle.ingredients" :key="index">
        <input
          type="checkbox"
          @click="strikeOut"
          :name="`cb-${ingredient[0].id}`"
          :id="`cb-${ingredient[0].id}`"
          class="checkbox"
        />
        <label
          class="cbLabel"
          :for="`cb-${item.id}`"
          v-for="(item, i) in ingredient"
          :key="i"
        >
          {{
            ingredient.length > 1
              ? i === ingredient.length - 1
                ? item.amount + " " + item.measure + " " + item.name
                : item.amount + " " + item.measure + " " + "+" + " "
              : item.amount + " " + item.measure + " " + item.name
          }}
        </label>
        <!-- <span v-else-if="ingredient.length > 1">
            {{ "boop" }}
          </span> -->
        <!-- <span v-for="(ing, i) in ingredient" :key="i">
          </span> -->
      </div>
    </div>
    <v-btn to="shopping-list/print" class="ma-2">
      Print
      <v-icon dark right>
        mdi-printer
      </v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import dayjs from "dayjs";
import { set } from "~/api";

export default Vue.extend({
  methods: {
    strikeOut(e: any) {
      if (e.target.parentNode.className) {
        e.target.parentNode.className = "";
      } else {
        e.target.parentNode.className = "strike";
      }
    }
  },
  async asyncData({ store }) {
    const startDate = dayjs(dayjs().day(0)).format("DD/MM/YYYY");

    const shoppingList = await fetch(`/api/shopping-list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accessToken: store.state.accessToken
      }
    }).then(res => res.json());

    let message;
    let aisleListWithIngredients: any = [];

    // console.log(shoppingList);

    if (shoppingList.ingredients) {
      //full array
      // console.log(shoppingList.ingredients);
      let idList: any = [];
      let aisleList: any = [];

      shoppingList.ingredients.forEach((ingredient: any) => {
        idList.push(ingredient.id);
        aisleList.push(ingredient.aisle);
      });
      idList = new Set(idList);
      aisleList = new Set(aisleList);

      // idList.forEach((id: number) => {
      //   console.log(id);
      // });
      let ingFilteredByIdList: any = [];
      const idArray = [...idList];
      idArray.forEach((id: number) => {
        const ingFilteredById = shoppingList.ingredients.filter(
          (ing: any) => ing.id === id
        );
        ingFilteredByIdList.push(ingFilteredById);
      });
      // console.log(ingFilteredByIdList);

      ingFilteredByIdList.forEach((idArray: any, i: number) => {
        if (idArray.length > 1) {
          //if there are multiple ingredients with same ID

          let finalArray: any = [];
          let measureMap = idArray.map((id: any) => id.measure);
          // .reduce((acc: any, cv: any) => {
          //   return acc.amount + cv.amount;
          // });
          measureMap = new Set(measureMap);
          measureMap = [...measureMap];
          // console.log(measureMap);
          if (measureMap.length > 1) {
            //if the ingredients have different units
            measureMap.forEach((el: any, i: number) => {
              let measureFilter = idArray.filter(
                (ing: any) => ing.measure === el
              );
              // console.log(measureFilter);
              if (measureFilter.length > 1) {
                //unit has more than one instance
                const egSum = measureFilter.reduce((acc: any, cv: any) => {
                  // console.log(measureFilter);
                  return { amount: acc.amount + cv.amount };
                });
                let { amount: ingSum } = egSum;
                if (String(ingSum).includes(".")) {
                  const amountInt = Math.floor(ingSum);
                  let amountDecimal = ingSum - amountInt;

                  if (amountDecimal !== 0.5) {
                    ingSum = ingSum.toFixed(2);
                  }
                }

                finalArray.push({ ...measureFilter[0], amount: ingSum });
              } else {
                // unit has only one instance
                // console.log({ ...measureFilter[0] }, "mf");
                finalArray.push(measureFilter[0]);
              }
            });
            ingFilteredByIdList[i] = finalArray;
          } else {
            //ingredients have same unit but different amounts
            const egSum = idArray.reduce((acc: any, cv: any) => {
              return { amount: acc.amount + cv.amount };
            });
            let { amount: ingSum } = egSum;
            if (String(ingSum).includes(".")) {
              const amountInt = Math.floor(ingSum);
              let amountDecimal = ingSum - amountInt;

              if (amountDecimal !== 0.5) {
                ingSum = ingSum.toFixed(2);
              }
            }
            ingFilteredByIdList[i] = [{ ...idArray[0], amount: ingSum }];
            // console.log(idArray, "same unit diff amount array");

            return;

            // console.log(idArray[0].name, ingSum, "same unit diff amount sum");
          }
        }
      });
      //separate each array into own object
      ingFilteredByIdList = ingFilteredByIdList.flatMap((el: any) => el);
      // console.log(ingFilteredByIdList);
      //rethink end

      // console.log(aisleList);
      // ingFilteredByIdList.forEach((el:any) => {

      // });
      aisleList.forEach((aisle: string) => {
        const ingredients = ingFilteredByIdList.filter(
          (ingredient: any) => ingredient.aisle === aisle
        );
        // console.log(ingredients);
        let ingredientObject: any = {
          aisle,
          ingredients: []
        };
        if (ingredients.length > 1) {
          let idList = ingredients.map((el: any) => el.id);
          idList = new Set(idList);
          idList = [...idList];
          // console.log(ingredients);
          // console.log(idList);

          idList.forEach((id: number) => {
            const ingFilterByIdAndAisle = ingredients.filter(
              (ing: any) => ing.id === id
            );
            // console.log(ingFilterByIdAndAisle);
            ingredientObject.ingredients.push(ingFilterByIdAndAisle);

            // ingFilterByIdAndAisle.forEach((ing: any) => {
            //   ingredientObject.ingredients.push(ing);
            // });
          });
          aisleListWithIngredients.push(ingredientObject);

          // ingredients.forEach((id: number) => {
          //   // console.log(ingredients);

          //   const ingById = ingredients.filter((el: any) => el.id === id);
          //   // console.log(ingById);
          //   ingredientObject.ingredients.push(ingById);
          // });
        } else {
          ingredientObject = {
            aisle,
            ingredients: [ingredients]
          };

          aisleListWithIngredients.push(ingredientObject);
        }
      });
      // console.log(aisleListWithIngredients);
      // sum up duplicates
      // aisleListWithIngredients.forEach((aisle: any) => {
      //   if (aisle.ingredients.length > 1) {
      //     let idList: any = [];
      //     aisle.ingredients.forEach((ingredient: any) => {
      //       idList.push(ingredient.id);
      //     });
      //     idList = new Set(idList);
      //     idList.forEach((id: number) => {
      //       let idFilter = aisle.ingredients.filter(
      //         (ing: any) => ing.id === id
      //       );
      //       // console.log(idFilter);
      //       //  const idSum = idFilter.reduce((el:any) =>)
      //       let sum = 0;

      //       idFilter.forEach((el: any) => {
      //         sum = sum + el.amount;
      //       });
      //       // console.log(sum);
      //     });
      //     // console.log(aisle.aisle + ": ", idList);
      //   }
      // });
    } else {
      message = "No list found";
    }

    return {
      shoppingList,
      aisleListWithIngredients
    };
  }
});
</script>

<style lang="scss" scoped>
/* .checkbox {
  height: 16px;
  width: 16px;
} */
.cbLabel:hover {
  cursor: pointer;
  /* background-color: rgb(188, 237, 253); */
}
.checkbox:hover {
  cursor: pointer;
}
.strike {
  text-decoration: line-through;
}
</style>
