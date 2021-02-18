const { Category, Ingredient , RecipeIngredient } = require("../db/models");

exports.fetchCategory = async (categoryId, next) => {
  try {
    const foundCategory = await Category.findByPk(categoryId);
    return foundCategory;
  } catch (error) {
    next(error);
  }
};

exports.categoryList = async (req, res, next) => {
  try {
    const _categorys = await Category.findAll({
      attributes: req.body,
      include: {
        model: Ingredient,
        as: "ingredients",
        attributes: ["id"],
      },
    });
    res.json(_categorys);
  } catch (error) {
    next(error);
  }
};

exports.categoryDetail = async (req, res) => {
  res.json(req.category);
};

exports.categoryCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};

exports.ingredientCreate = async (req, res, next) => {
  console.log(req.body);
  try {
    
    req.body.categoryId = req.category.id;
    
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
      
    }
    
    const newIngredient = await Ingredient.create(req.body);
    res.status(201).json(newIngredient);
  } catch (error) {
    next(error);
  }
};


