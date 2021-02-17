const { Ingredient, Category } = require("../db/models");

exports.fetchIngredient = async (ingredientId, next) => {
  try {
    const foundIngredient = await Ingredient.findByPk(ingredientId);
    return foundIngredient;
  } catch (error) {
    next(error);
  }
};

exports.ingredientList = async (req, res, next) => {
  try {
    const _ingredients = await Ingredient.findAll();
    res.json(_ingredients);
  } catch (error) {
    next(error);
  }
};

exports.ingredientDetail = async (req, res) => {
  res.json(req.ingredient);
};
