const { Ingredient, Recipe } = require("../db/models");

exports.fetchRecipe = async (recipeId, next) => {
  try {
    const foundRecipe = await Recipe.findByPk(recipeId);
    return foundRecipe;
  } catch (error) {
    next(error);
  }
};

exports.recipeList = async (req, res, next) => {
  try {
    const _recipes = await Recipe.findAll();
    res.json(_recipes);
  } catch (error) {
    next(error);
  }
};

exports.recipeDetail = async (req, res) => {
  res.json(req.recipe);
};
