<template>
  <v-card class="my-4 mx-auto" max-width="344">
    <slot name="image" />
    <v-card-title>
      <slot name="title" />
    </v-card-title>

    <v-card-subtitle>
      <slot name="servings" />
    </v-card-subtitle>

    <v-card-actions>
      <slot name="link" />

      <v-spacer></v-spacer>

      <v-menu transition="slide-y-transition" bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="teal" color="primary" dark v-bind="attrs" v-on="on">
            Actions
          </v-btn>
        </template>
        <v-list>
          <v-list-item class="hoverClass" v-for="(item, i) in items" :key="i">
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
export default {
  data: () => ({
    items: [
      { title: "Add to Shopping List" },
      { title: "Add to Meal Plan" },
      { title: "Delete recipe" }
    ]
  })
};
</script>
<style lang="scss" scoped>
.hoverClass:hover {
  cursor: pointer;

  background-color: rgb(59, 151, 120);
}
</style>
