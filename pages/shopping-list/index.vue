<template>
  <div class="container" id="container-child">
    <div class="main" v-if="!message">
      <h2>Shopping list {{ dateString }}</h2>
      <div
        class="aisle"
        v-for="(aisle, i) in aisleListWithIngredients"
        :key="i"
      >
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
      <v-btn to="shopping-list/print" class="mt-2">
        Print
        <v-icon dark right>
          mdi-printer
        </v-icon>
      </v-btn>
    </div>
    <div class="main" v-else>
      <h2>{{ message }} for {{ dateString }}</h2>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { fetchShoppingList } from "~/utils.ts";

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
    const res = await fetchShoppingList(store);

    return {
      ...res
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

h2 {
  font-size: 2rem;
  word-break: break-word;
}
h4 {
  font-size: 1.25rem;
  margin-top: 1rem;
}
.main {
  padding-left: 2rem;
  padding-right: 2rem;
}

#container-child {
  display: flex;
  justify-content: center;
}

.aisle {
  div {
    word-break: break-word;
  }
}

.cbLabel {
  padding: 3px 2px;
}
@media screen and (min-width: 768px) {
  h2 {
    font-size: 2.5rem;
  }
}
</style>
