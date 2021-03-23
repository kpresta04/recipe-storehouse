<template>
  <div class="container">
    <h1>Login to RecipeDB</h1>
    <form @submit.prevent="userLogin">
      <div class="form-grp">
        <div class="input-grp">
          <label for="email">Email</label>

          <input
            required
            type="email"
            name="email"
            id="email"
            v-model="login.email"
          />
        </div>

        <div class="input-grp">
          <label for="password">Password</label>
          <input
            required
            type="password"
            name="password"
            id="password"
            v-model="login.password"
          />
        </div>

        <div>
          <p>{{ error }}</p>
          <v-btn type="submit" depressed color="primary"> Submit</v-btn>
        </div>
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
      },
      error: ""
    };
  },
  methods: {
    async userLogin() {
      fetch("/auth/login", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.login)
      })
        .then(response => response.json())
        .then(data => {
          // console.log(data);
          if (!data.error) {
            this.$store.commit("SET_TOKEN", data.accessToken);
            localStorage.setItem("accessToken", data.accessToken);
            this.$router.push("/");
          } else {
            this.error = "Incorrect email or password";
          }
          // console.log(data);
        })
        .catch(error => {
          console.error("Error: ", error);
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
