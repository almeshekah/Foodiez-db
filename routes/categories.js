const express = require("express");
const upload = require("../middleware/multer");
const router = express.Router();
const {
  categoryList,
  categoryCreate,
  categoryDetail,
  fetchCategory,
  ingredientCreate,
} = require("../controllers/categoryController");

router.param("categoryId", async (req, res, next, categoryId) => {
  const foundCategory = await fetchCategory(categoryId, next);
  if (foundCategory) {
    req.category = foundCategory;
    console.log(req.body);
    next();
  } else {
    next({
      status: 404,
      message: "category not found",
    });
  }
});

router.get("/", categoryList);

router.get("/:categoryId", categoryDetail);

router.post("/", upload.single("image"), categoryCreate);

router.post(
  "/:categoryId/ingredients",
  upload.single("image"),
  ingredientCreate
);

module.exports = router;
