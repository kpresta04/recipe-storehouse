<template>
  <v-card class="recipeCard" max-width="344">
    <slot name="toolbar" />

    <slot name="image" />
    <div class="cardBody">
      <v-card-title class="cardTitle">
        <slot name="title" />
      </v-card-title>

      <v-card-subtitle>
        <slot name="servings" />
      </v-card-subtitle>

      <v-card-actions class="actions">
        <slot name="link" />

        <v-spacer></v-spacer>

        <v-menu transition="slide-y-transition" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              :color="color ? color : 'teal'"
              dark
              v-bind="attrs"
              v-on="on"
            >
              Actions
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              @click="handleItemClick"
              class="hoverClass"
              v-for="(item, i) in items"
              :key="i"
            >
              <v-list-item-title class="listItem">{{
                item.title
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <!-- <v-btn>
        Actions
         <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon> 
      </v-btn> -->
      </v-card-actions>
    </div>

    <!-- <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          I'm a thing. But, like most politicians, he promised more than he
          could deliver. You won't have time for sleeping, soldier, not with all
          the bed making you'll be doing. Then we'll go with that data file!
          Hey, you add a one and two zeros to that or we walk! You're going to
          do his laundry? I've got to find a way to escape.
        </v-card-text>
      </div>
    </v-expand-transition> -->
  </v-card>
</template>
<script>
import { delRecipe } from "~/utils.ts";
export default {
  data: () => ({
    items: [
      { title: "Add to Shopping List" },
      // { title: "Add to Meal Plan" },
      { title: "Delete recipe" }
    ]
  }),
  props: ["source", "recipe_id", "color"],

  methods: {
    handleItemClick(e) {
      if (e.target.textContent === "Delete recipe") {
        this.$emit("deleteRecipe", this.recipe_id);

        delRecipe(this.recipe_id, this.$store);
      } else if (e.target.textContent === "Add to Shopping List") {
        console.log("add to shopping list");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.cardTitle {
  word-break: break-word;
}
.hoverClass:hover {
  cursor: pointer;

  background-color: rgb(216, 216, 216);
}
.cardBody {
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.actions {
  margin-top: auto;
}

.recipeCard {
  margin: 16px auto;
  display: flex;
  flex-direction: column;
}
</style>
