const { Router } = require("express");
require("dotenv").config();

const router = Router();

// Test route
router.use("/test", (req, res) => {
  res.send("Test API!");
});

module.exports = router;
