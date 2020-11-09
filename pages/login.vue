<template>
  <div>
    <h1>Login</h1>
    <form>
      <input type="email" name="email" id="email" />
      <div class="break"></div>
      <input type="password" name="password" id="password" />
      <div class="break"></div>

      <button type="submit">Log In</button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style lang="scss" scoped>
form {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  input {
    margin: 1rem;
  }
  button {
    margin: 1rem auto;
  }
}
.break {
  width: 100%;
}
</style>
