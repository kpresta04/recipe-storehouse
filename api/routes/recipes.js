require("dotenv").config();
const { Router } = require("express");
import { PrismaClient } from "@prisma/client";
const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();
const router = Router();
router.get("/recipe/:id", authenticateToken, async (req, res) => {
  const user = JSON.parse(JSON.stringify(req.user));

  try {
    const id = Number(req.params.id);
    const recipe = await prisma.recipe.findOne({
      where: { id: id },
      include: {
        notes: {
          where: {
            userId: user.id
          }
        }
      }
    });
    res.send(recipe);
  } catch (error) {
    console.log(error);
  }
});
router.delete("/recipe/:id", authenticateToken, async (req, res) => {
  const user = JSON.parse(JSON.stringify(req.user));

  try {
    const id = Number(req.params.id);
    const recipe = await prisma.recipe.update({
      where: { id: id },
      data: {
        users: {
          disconnect: { id: user.id }
        }
      }
    });
    res.send({ status: "200", message: "disconnect successful" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/recipes", authenticateToken, async (req, res) => {
  const user = JSON.parse(JSON.stringify(req.user));

  try {
    const recipes = await prisma.user
      .findOne({ where: { email: user.email } })
      .recipes();
    res.send(recipes);
  } catch (error) {
    console.log(error);
  }
});
router.post("/note", authenticateToken, async (req, res) => {
  const user = JSON.parse(JSON.stringify(req.user));
  const recipeID = Number(req.body.recipeId);
  try {
    const note = await prisma.note.upsert({
      where: {
        recipeId_userId: {
          recipeId: recipeID,
          userId: user.id
        }
      },
      update: {
        text: req.body.text
      },
      create: {
        text: req.body.text,
        // recipeId: recipeID,
        // userId: user.id,

        User: {
          connect: { id: user.id }
        },
        Recipe: {
          connect: { id: recipeID }
        }
      }
    });

    res.send(note);
  } catch (error) {
    console.log(error);
  }
}),
  router.post("/import", authenticateToken, async (req, res) => {
    const user = JSON.parse(JSON.stringify(req.user));
    // console.log(user.email);
    // console.log(user);

    try {
      const response = await fetch(
        `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/extract?url=${req.body.recipeURL}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": process.env.API_KEY,
            "x-rapidapi-host":
              "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
          }
        }
      );
      // console.log(response);

      const data = await response.json();
      if (data.status === "failure") {
        return res.status(data.code).send({ error: data });
      }

      let {
        analyzedInstructions,
        servings,
        cuisines,
        diets,
        dishTypes,
        extendedIngredients,
        image,
        sourceUrl,
        title
      } = data;

      extendedIngredients = extendedIngredients.filter(
        ingredient => ingredient.aisle !== "?"
      );
      const recipe = await prisma.recipe.upsert({
        where: { sourceURL: sourceUrl },
        update: {
          title,
          sourceURL: sourceUrl,
          analyzedInstructions,
          servings,
          cuisines,
          diets,
          dishTypes,
          extendedIngredients,
          imageURL: image,
          users: {
            connect: { id: user.id }
          }
        },
        create: {
          title,
          sourceURL: sourceUrl,
          analyzedInstructions,
          servings,
          cuisines,
          diets,
          dishTypes,
          extendedIngredients,
          imageURL: image,
          users: {
            connect: { id: user.id }
          }
        }
      });
      res.send(recipe);
    } catch (error) {
      console.log(error);
    }

    // .then(response => {

    //   return response.json();
    // })
    // .then( data => {
    //   console.log(data);
    // const recipe = await prisma.recipe.upsert({
    //   where: { sourceURL: data.sourceUrl },
    //   update: { email: 'alice@prisma.io' },
    //   create: { email: 'alice@prisma.io' },
    // })
    //   res.send(data);
    // })
    // .catch(err => {
    //   console.error(err);
    // });
  });
function authenticateToken(req, res, next) {
  const token = req.headers.accesstoken;

  if (!token) {
    return res.sendStatus(401);
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;

      next();
    });
  }
}
module.exports = router;
