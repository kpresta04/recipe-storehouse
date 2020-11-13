<template>
  <div>
    <button>Test express route</button>
    <nuxt-link to="/my-recipes">My recipes</nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  methods: {
    hello: async function() {
      // console.log('hello')

      const res = await fetch("/api/test");
      const text = await res.text();

      console.log(text);
    }
  }
});
</script>

<style scoped>
button {
  background-color: rgb(0, 106, 206);
}
</style>
