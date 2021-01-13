<template>
  <v-card>
    <v-container fluid>
      <v-row align="center">
        <v-col cols="12">
          <v-autocomplete
            v-model="recipeName"
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
  mounted() {
    this.items = this.recipes.flatMap(recipe => recipe.title);
    // console.log(this.items);
  }
};
</script>
