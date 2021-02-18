const express = require("express");
const upload = require("../middleware/multer");
const router = express.Router();
const {
  recipeList,
  recipeCreate,
  recipeDetail,
  fetchRecipe,
} = require("../controllers/recipeController");

router.param("recipeId", async (req, res, next, recipeId) => {
  const foundRecipe = await fetchRecipe(recipeId, next);
  if (foundRecipe) {
    req.recipe = foundRecipe;
    next();
  } else {
    next({
      status: 404,
      message: "recipe not found",
    });
  }
});

router.get("/", recipeList);
router.post("/", upload.single("image"), recipeCreate);
router.get("/:recipeId", recipeDetail);

module.exports = router;
