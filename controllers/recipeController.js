const { Ingredient, Recipe, RecipeIngredients } = require("../db/models");

exports.fetchRecipe = async (recipeId, next) => {
  try {
    const foundRecipe = await Recipe.findByPk(recipeId, {
      include: {
        model: Ingredient,
        as: "ingredients",
        attributes: ["id", "name", "image"],
        through: {
          attributes: ["recipeId", "ingredientId"],
        },
      },
    });
    return foundRecipe;
  } catch (error) {
    next(error);
  }
};

exports.recipeList = async (req, res, next) => {
  try {
    const _recipes = await Recipe.findAll({
      include: {
        model: Ingredient,
        as: "ingredients",
        through: {
          attributes: ["recipeId", "ingredientId"],
        },
      },
    });
    res.json(_recipes);
  } catch (error) {
    next(error);
  }
};

exports.recipeDetail = async (req, res) => {
  res.json(req.recipe);
};

exports.recipeCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }

    const newRecipe = await Recipe.create(req.body);
    newRecipe.addIngredients(req.body.ingredients);
    res.status(201).json(newRecipe);
  } catch (error) {
    next(error);
  }
};
