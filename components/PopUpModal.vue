<template>
  <v-dialog v-model="dialog" max-width="290">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="ma-2" :color="color" dark v-bind="attrs" v-on="on">
        {{ buttonText }}
        <slot name="buttonIcon" />
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">
        Use Google's location service?
      </v-card-title>
      <v-card-text
        >Let Google help apps determine location. This means sending anonymous
        location data to Google, even when no apps are running.</v-card-text
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="black darken-1" text @click="dialog = false">
          Cancel
        </v-btn>
        <v-btn color="green darken-1" text @click="dialog = false">
          Agree
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
      dialog: false
    };
  },
  props: ["color", "buttonText"]
});
</script>

<style lang="scss" scoped></style>
