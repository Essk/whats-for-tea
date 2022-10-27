const { isValidObjectId, model } = require("mongoose");
const { mealPartSchema } = require("../schema");

// set up model
const MealPart = model("MealPart", mealPartSchema);

async function createOneMealPart(mealPart) {
  const {
    name,
    method = [],
    duration = 0,
    recipeIngredients = [],
    equipment = [],
  } = mealPart;

  const mealPartToUpdate = { ...mealPart };
  const query = { name };
  const options = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  };
  return MealPart.findOneAndUpdate(query, mealPartToUpdate, options);
}

async function deleteMealPart(slug) {
  return MealPart.findOneAndDelete({ slug });
}

async function getMealPart(slug) {
  return MealPart.findOne({ slug });
}

async function getMealParts() {
  return MealPart.find();
}

module.exports = {
  deleteMealPart,
  getMealPart,
  getMealParts,
  createOneMealPart,
};
