<template>
  <div>
    <form @submit.prevent="userRegister">
      <div>
        <label>First Name</label>

        <input
          type="text"
          name="firstName"
          id="firstName"
          v-model="login.firstName"
        />
      </div>
      <div class="break"></div>

      <div>
        <label>Last Name</label>

        <input
          type="lastName"
          name="lastName"
          id="lastName"
          v-model="login.lastName"
        />
      </div>
      <div class="break"></div>

      <div>
        <label>Email</label>

        <input
          type="email"
          name="email"
          id="email"
          v-model="login.email"
          required
        />
      </div>
      <div class="break"></div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          required
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
        password: "",
        firstName: "",
        lastName: ""
      }
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
          console.log("Success:", data);
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
