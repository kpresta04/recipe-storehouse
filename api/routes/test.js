const { Router } = require("express");
require("dotenv").config();

const router = Router();

// Test route
router.get("/test", (req, res) => {
  res.send("Test API!");
});

// router.post("/auth/login", async (req, res) => {
//   console.log("loggin in");
//   try {
//     let response = await this.$auth.loginWith("local", {
//       data: { email: this.login.email, password: this.login.password }
//     });
//     console.log(response);
//     res.send(response);
//   } catch (error) {
//     console.log(error);
//     res.send(error);
//   }
// });

module.exports = router;
