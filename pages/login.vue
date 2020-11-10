<template>
  <div>
    <form @submit.prevent="userLogin">
      <div>
        <label>Email</label>

        <input
          required
          type="email"
          name="email"
          id="email"
          v-model="login.email"
        />
      </div>
      <div class="break"></div>
      <div>
        <label>Password</label>
        <input
          required
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
      fetch("/api/login", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.login)
      })
        .then(response => response.text())
        .then(data => {
          console.log(data);
          this.$store.commit("SET_USER", this.login.email);
        })
        .catch(error => {
          console.error("Error:", error);
        });
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
