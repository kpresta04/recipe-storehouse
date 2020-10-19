<template>
  <div>
    <button @click="hello">Test express route</button>
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
