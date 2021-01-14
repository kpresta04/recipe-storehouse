<template>
  <v-card>
    <v-container fluid>
      <v-row align="center">
        <v-col cols="12">
          <v-autocomplete
            v-model="recipeName"
            @change="recipeNameChanged"
            :items="items"
            dense
            filled
            label="Recipe"
          ></v-autocomplete>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    items: [],

    recipeName: null
  }),
  props: ["recipes"],
  methods: {
    recipeNameChanged() {
      // console.log(this.recipeName);
      this.$store.commit("SET_RECIPE_OBJECT", {
        ...this.$store.state.recipeObject,
        name: this.recipeName
      });
    }
  },
  mounted() {
    this.items = this.recipes.flatMap(recipe => recipe.title);
    // console.log(this.items);
  }
};
</script>
