const { Router } = require("express");
require("dotenv").config();
const bcrypt = require("bcrypt");
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = Router();

// Test route
router.get("/test", (req, res) => {
  res.send("Test API!");
});

router.post("/login", async (req, res) => {
  try {
    const user = await prisma.user.findOne({
      where: {
        email: req.body.email
      },
      select: { hash: true }
    });
    if (await bcrypt.compare(req.body.password, user.hash)) {
      res.send("Success");
    } else {
      res.send("Not Allowed");
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      hash: hashedPassword
    };
    await prisma.user.create({ data: user });

    res.send(user);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
