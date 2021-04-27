const { Router } = require("express");
require("dotenv").config();
const bcrypt = require("bcrypt");
import { PrismaClient } from "@prisma/client";
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

const router = Router();

router.get("/refresh", async (req, res) => {
  res.send("rf done");
});
router.post("/login", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email
      }
    });
    if (user && (await bcrypt.compare(req.body.password, user.hash))) {
      //Login successful
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "30d"
      });

      // const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      // console.log(decoded);
      //
      res.send({ accessToken });
    } else {
      //Wrong password or email
      res.status(401).send({ error: "Login failed: incorrect credentials" });
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
    const createUser = await prisma.user.create({ data: user });

    res.send({ message: "success" });
  } catch (error) {
    res.status(403).send({ error: error.message });
  }
});

module.exports = router;
