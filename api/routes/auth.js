const { Router } = require("express");
require("dotenv").config();
const bcrypt = require("bcrypt");
import { PrismaClient } from "@prisma/client";
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const user = await prisma.user.findOne({
      where: {
        email: req.body.email
      }
    });
    if (!user) {
      //Email does not exist
      res.send({ error: "Incorrect email" });
    } else if (await bcrypt.compare(req.body.password, user.hash)) {
      //Login successful
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      console.log(decoded);

      res.send({ accessToken });
    } else {
      //Wrong password
      res.send({ error: "Wrong Password" });
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
    res.send({ message: error.message });
  }
});

module.exports = router;
