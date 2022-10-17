const { ingredientSchema } = require("../schema");

// set up model
const Ingredient = model("Ingredient", ingredientSchema);

async function createOneIngredient(name) {
  const query = { name };
  const options = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  };

  return Ingredient.findOneAndUpdate(query, { name }, options);
}
