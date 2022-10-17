const { ingredientSchema } = require("../schema");
const { model } = require("mongoose");

// set up model
const Ingredient = model("Ingredient", ingredientSchema);

async function createOneIngredient(ingredient) {
  const { name } = ingredient;
  const query = { name };
  const options = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  };

  return Ingredient.findOneAndUpdate(query, { name }, options);
}

module.exports = {
  createOneIngredient,
};
