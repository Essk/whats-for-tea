const { ingredientSchema } = require("../schema");
const { model } = require("mongoose");

// set up model
const Ingredient = model("Ingredient", ingredientSchema);

async function createOneIngredient(ingredient) {
  const { name } = ingredient;
  if (!name) {
    return {};
  }
  const query = { name };
  const options = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  };

  return Ingredient.findOneAndUpdate(query, { name }, options);
}

async function deleteIngredient(slug) {
  return Ingredient.findOneAndDelete({ slug });
}

async function getIngredient(slug) {
  return Ingredient.findOne({ slug });
}

async function getIngredients() {
  return Ingredient.find();
}

module.exports = {
  createOneIngredient,
  getIngredient,
  getIngredients,
  deleteIngredient,
};
