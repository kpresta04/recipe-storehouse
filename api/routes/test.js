const { Router } = require("express");

const router = Router();

// Test route
router.use("/test", (req, res) => {
  console.log("route hit");
  res.send("Test API!");
});

module.exports = router;
