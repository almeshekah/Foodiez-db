const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define(
    "Recipe",
    {
      name: {
        type: DataTypes.STRING,
      },
      slug: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
      video: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      instructions: {
        type: DataTypes.STRING,
      },
      
    },
    { timestamps: false }
  );
  SequelizeSlugify.slugifyModel(Recipe, {
    source: ["name"],
  });
  return Recipe;
};
