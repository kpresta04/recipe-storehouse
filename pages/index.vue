<template>
  <div></div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  mounted() {
    const token = localStorage.getItem("accessToken");
    if (token && !this.$store.state.accessToken) {
      this.$store.commit("SET_TOKEN", token);
    }
  }
});
</script>

<style scoped></style>
