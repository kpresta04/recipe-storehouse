<template>
  <div class="container">
    <h1>Sign up for RecipeDB</h1>
    <form @submit.prevent="userRegister">
      <div class="form-grp">
        <div class="input-grp">
          <label for="firstName">First Name</label>

          <input
            type="text"
            name="firstName"
            id="firstName"
            v-model="login.firstName"
          />
        </div>

        <div class="input-grp">
          <label for="lastName">Last Name</label>

          <input
            type="lastName"
            name="lastName"
            id="lastName"
            v-model="login.lastName"
          />
        </div>

        <div class="input-grp">
          <label for="email">Email</label>

          <input
            type="email"
            name="email"
            id="email"
            v-model="login.email"
            required
          />
        </div>

        <div class="input-grp">
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            required
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
        password: "",
        firstName: "",
        lastName: ""
      },
      error: ""
    };
  },
  methods: {
    async userRegister() {
      fetch("/auth/register", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.login)
      })
        .then(response => response.json())
        .then(data => {
          // console.log(data);
          if (data.error) {
            this.error = "An error ocurred.";
          } else {
            this.$router.push("/login");
          }
        })
        .catch(error => {
          console.error("Error: ", error);
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
