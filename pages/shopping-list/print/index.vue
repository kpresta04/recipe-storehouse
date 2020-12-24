<template>
  <div class="main">
    <div v-if="!message">
      <h2>Shopping List {{ dateString }}</h2>
      <div v-for="(aisle, i) in aisleListWithIngredients" :key="i">
        <h4>{{ aisle.aisle }}</h4>
        <ul>
          <li v-for="(ingredient, index) in aisle.ingredients" :key="index">
            <!-- <input
          type="checkbox"
          @click="strikeOut"
          :name="`cb-${ingredient[0].id}`"
          :id="`cb-${ingredient[0].id}`"
          class="checkbox"
        /> -->
            <span
              @click="strikeOut"
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
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div v-else>
      <h2>{{ message }}</h2>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { fetchShoppingList } from "~/utils.ts";

export default Vue.extend({
  middleware: "authenticated",
  layout: "print",
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
    const res = await fetchShoppingList(store);

    return {
      ...res
    };
  }
});
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  max-width: 900px;
  padding: 12px;
  /* margin-right: auto; */
  margin-left: 3em;
  font-family: "Roboto", sans-serif;
  line-height: 1.5;
}
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
