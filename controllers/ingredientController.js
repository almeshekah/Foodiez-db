const { Ingredient, Recipe , RecipeIngredient } = require("../db/models");

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

exports.recipeCreate = async (req, res, next) => {
 
  try {
    
    req.body.ingredientId = req.ingredient.id;
    
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
      
    }
    
    const newRecipe = await Recipe.create(req.body);
    res.status(201).json(newRecipe);
  } catch (error) {
    next(error);
  }
};



