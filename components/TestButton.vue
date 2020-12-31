<template>
  <v-btn color="black darken-1" text @click="closeDiag">
    Cancel
  </v-btn>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  methods: {
    closeDiag() {
      this.$emit("close-dialog");
    }
  }
});
</script>

<style scoped></style>
