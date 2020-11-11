require("dotenv").config();
const { Router } = require("express");
import { PrismaClient } from "@prisma/client";
const fetch = require("node-fetch");

const prisma = new PrismaClient();
const router = Router();

router.post("/import", async (req, res) => {
  fetch(
    `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/extract?url=${req.body.recipeURL}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.API_KEY,
        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
      }
    }
  )
    .then(response => {
      //   console.log(response);
      return response.json();
    })
    .then(data => {
      //   console.log(data);
      res.send(data);
    })
    .catch(err => {
      console.error(err);
    });
});

module.exports = router;
