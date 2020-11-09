<template>
  <div>
    <form @submit.prevent="userLogin">
      <div>
        <label>Email</label>

        <input type="email" name="email" id="email" v-model="login.email" />
      </div>
      <div class="break"></div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          id="password"
          v-model="login.password"
        />
      </div>
      <div class="break"></div>

      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async userLogin() {
      try {
        let response = await this.$auth.loginWith("local", {
          data: this.login
        });
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
  }
};
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
