<template>
  <div>
    <div v-for="(aisle, i) in aisleListWithIngredients" :key="i">
      <h4>{{ aisle.aisle }}</h4>
      <ul>
        <li v-for="(ingredient, i) in aisle.ingredients" :key="i">
          {{
            ingredient.amount + " " + ingredient.measure + " " + ingredient.name
          }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import dayjs from "dayjs";
import { set } from "~/api";

export default Vue.extend({
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
      console.log(shoppingList.ingredients);
      let idList: any = [];
      shoppingList.ingredients.forEach((ingredient: any) => {
        idList.push(ingredient.id);
      });
      idList = new Set(idList);
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
      console.log(ingFilteredByIdList);

      //rethink end
      let aisleList: any = [];

      shoppingList.ingredients.forEach((ingredient: any) => {
        aisleList.push(ingredient.aisle);
      });
      aisleList = new Set(aisleList);
      // console.log(aisleList);
      aisleList.forEach((aisle: string) => {
        const ingredients = shoppingList.ingredients.filter(
          (ingredient: any) => ingredient.aisle === aisle
        );
        const ingredientObj: any = {
          aisle,
          ingredients
        };
        aisleListWithIngredients.push(ingredientObj);
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

<style lang="scss" scoped></style>
