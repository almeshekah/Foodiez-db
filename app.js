const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const path = require("path");
const db = require("./db/models");
app.use(express.json());
const categoryRoutes = require("./routes/categories");
const ingredientRoutes = require("./routes/ingredients");
const recipeRoutes = require("./routes/recipes");
app.use("/categories", categoryRoutes);
app.use("/ingredients", ingredientRoutes);
app.use("/recipes", recipeRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});

app.use((req, res, next) => {
  next({
    status: 404,
    message: "Path Not Found",
  });
});

app.use((err, req, res, next) => {
  res
    .status(err.status ? err.status : 500)
    .json({ message: err.message ? err.message : "Internal Server Error " });
});

//db.sequelize.sync();
db.sequelize.sync({ alter: true });
//db.sequelize.sync({force:true});
