const { Ingredient, Recipe, RecipeIngredient } = require("../db/models");

exports.fetchIngredient = async (ingredientId, next) => {
  try {
    const foundIngredient = await Ingredient.findByPk(ingredientId, {
      include: {
        model: Recipe,
        as: "recepies",
        attributes: ["id"],
        through: {
          attributes: ["recipeId", "ingredientId"],
        },
      },
    });
    return foundIngredient;
  } catch (error) {
    next(error);
  }
};

exports.ingredientList = async (req, res, next) => {
  try {
    const _ingredients = await Ingredient.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Recipe,
        as: "recipes",
        attributes: ["id"],
        through: {
          attributes: ["recipeId", "ingredientId"],
        },
      },
    });
    res.json(_ingredients);
  } catch (error) {
    next(error);
  }
};

exports.ingredientDetail = async (req, res) => {
  res.json(req.ingredient);
};
