const express = require("express");
const upload = require("../middleware/multer");
const router = express.Router();
const {
  ingredientList,
  recipeCreate,
  ingredientDetail,
  fetchIngredient,
} = require("../controllers/ingredientController");

router.param("ingredientId", async (req, res, next, ingredientId) => {
  const foundIngredient = await fetchIngredient(ingredientId, next);
  if (foundIngredient) {
    req.ingredient = foundIngredient;
    next();
  } else {
    next({
      status: 404,
      message: "ingredient not found",
    });
  }
});

router.get("/", ingredientList);

router.get("/:ingredientId", ingredientDetail);

module.exports = router;
