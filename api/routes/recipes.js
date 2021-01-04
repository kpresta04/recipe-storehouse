require("dotenv").config();
const { Router } = require("express");
import { PrismaClient } from "@prisma/client";
const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();
const router = Router();
import dayjs from "dayjs";

router.delete("/recipe/:id/tag", authenticateToken, async (req, res) => {
  const user = JSON.parse(JSON.stringify(req.user));
  const tagId = { recipeId: Number(req.params.id), userId: user.id };

  try {
    await prisma.tag.delete({
      where: {
        recipeId_userId: tagId
      }
    });
    // await prisma.$disconnect();

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
  }
}),
  router.get("/shopping-list", authenticateToken, async (req, res) => {
    const user = JSON.parse(JSON.stringify(req.user));
    const startDate = dayjs(dayjs().day(0)).format("DD/MM/YYYY");

    try {
      const shoppingList = await prisma.shoppingList.findUnique({
        where: {
          userId: user.id
        }
      });
      if (shoppingList !== null) {
        res.send(shoppingList);
      } else {
        res.send({ message: "No shopping list found" });
      }
    } catch (error) {
      console.log(error);
      res.end();
    }
  }),
  router.post("/shopping-list", authenticateToken, async (req, res) => {
    const user = JSON.parse(JSON.stringify(req.user));
    const startDate = dayjs(dayjs().day(0)).format("DD/MM/YYYY");

    // console.log(req.body);
    // res.send(req.body);
    try {
      const shoppingList = await prisma.shoppingList.findUnique({
        where: {
          userId: user.id
        }
      });
      // console.log(shoppingList);

      let returnedList;

      if (shoppingList !== null) {
        //update shopping list
        if (shoppingList.startDate === startDate) {
          //update current List

          returnedList = await prisma.shoppingList.update({
            where: {
              userId: user.id
            },
            data: {
              ingredients: [
                ...shoppingList.ingredients,
                ...req.body.ingredients
              ]
            }
          });
        } else {
          //List is from last week, erase
          returnedList = await prisma.shoppingList.update({
            where: {
              userId: user.id
            },
            data: {
              ingredients: req.body.ingredients,
              startDate: req.body.startDate
            }
          });
        }
      } else {
        //create shopping list
        returnedList = await prisma.shoppingList.create({
          data: {
            user: {
              connect: { id: user.id }
            },
            ingredients: req.body.ingredients,
            startDate: req.body.startDate
          }
        });
      }
      // const shoppingListUpdated = await prisma.shoppingList.create({
      //   where: {
      //     startDate_userId: {
      //       startDate: req.body.startDate,
      //       userId: user.id
      //     }
      //   },
      //   update: {
      //     ingredients: [...shoppingList.ingredients, ...req.body.ingredients]
      //   },
      //   create: {
      //     ingredients: req.body.ingredients,
      //     startDate: req.body.startDate,

      //     user: {
      //       connect: { id: user.id }
      //     }
      //   }
      // });
      res.send({ returnedList });
    } catch (error) {
      console.log(error);
      res.send({ message: error });
    }
  }),
  router.post("/recipe/:id/tag", authenticateToken, async (req, res) => {
    const user = JSON.parse(JSON.stringify(req.user));
    const recipeID = Number(req.params.id);

    try {
      const tag = await prisma.tag.upsert({
        where: {
          recipeId_userId: {
            recipeId: recipeID,
            userId: user.id
          }
        },
        update: {
          tagList: req.body.tagList
        },
        create: {
          tagList: req.body.tagList,
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

      res.send(tag);
    } catch (error) {
      console.log(error);
    }
  }),
  router.get("/recipe/:id", authenticateToken, async (req, res) => {
    const user = JSON.parse(JSON.stringify(req.user));

    try {
      const id = Number(req.params.id);
      const recipe = await prisma.recipe.findUnique({
        where: { id: id },
        include: {
          notes: {
            where: {
              userId: user.id
            }
          },
          tags: {
            where: {
              userId: user.id
            },
            select: { tagList: true }
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
router.get("/userInfo", authenticateToken, async (req, res) => {
  const user = JSON.parse(JSON.stringify(req.user));

  try {
    const info = await prisma.user.findUnique({
      where: { email: user.email },
      include: {
        recipes: true,
        MealPlans: true,
        shoppingLists: true
      }
    });

    const { recipes, MealPlans, shoppingLists } = info;
    res.send({ recipes, MealPlans, shoppingLists });
  } catch (error) {
    console.log(error);
  }
});
router.get("/recipes", authenticateToken, async (req, res) => {
  const user = JSON.parse(JSON.stringify(req.user));

  try {
    const recipes = await prisma.user
      .findUnique({ where: { email: user.email } })
      .recipes();

    // {
    // include: {
    //   tags: true
    // }
    // }
    res.send(recipes);
  } catch (error) {
    console.log(error);
  }
});
router.delete("/note/:recipeId", authenticateToken, async (req, res) => {
  const user = JSON.parse(JSON.stringify(req.user));
  const noteId = { recipeId: Number(req.params.recipeId), userId: user.id };
  // console.log(noteId);
  try {
    await prisma.note.delete({
      where: {
        recipeId_userId: noteId
      }
    });

    res.sendStatus(204);
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

      extendedIngredients.forEach(ing => {
        ing.unit = ing.unit === "g" ? "grams" : ing.unit;
      });
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
