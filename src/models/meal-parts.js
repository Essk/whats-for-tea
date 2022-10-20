const { isValidObjectId, model } = require("mongoose");
const {
  mealPartSchema,
  equipmentItemSchema,
  ingredientSchema,
  measurementSchema,
} = require("../schema");

// set up models
const MealPart = model("MealPart", mealPartSchema);
const EquipmentItem = model("EquipmentItem", equipmentItemSchema);
const Ingredient = model("Ingredient", ingredientSchema);
const Measurement = model("Measurement", measurementSchema);

const sortMethodSteps = (methodSteps) => {
  methods.sort((a, b) => {
    const stepIndexA =
      typeof a?.method?.stepIndex === "number"
        ? a.method.stepIndex
        : methodSteps.length - 1;
    const stepIndexB =
      typeof b?.method?.stepIndex === "number"
        ? b.method.stepIndex
        : methodSteps.length;
    // this is a guess and probably will need to be changed
    return a > b ? 1 : -1;
  });
};

async function createOneMealPart(MealPart) {
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

async function addDuration(mealPart, duration) {
  if (!mealPart instanceof MealPart) {
    console.log("provide mealPart document as first argument");
    return null;
  }

  if (typeof duration !== "number") {
    console.log("duration should be a number");
    return null;
  }
  mealPart.duration = duration;
  return createOneMealPart(mealPart);
}

async function addEquipment(mealPart, equipment) {
  if (!mealPart instanceof MealPart) {
    console.log("provide mealPart document as first argument");
    return null;
  }

  const addToExistingEquipment = (existingEquiment, newEqipmentId) => {
    return [...existingEquiment, newEqipmentId];
  };

  const equipmentId = isValidObjectId(equipment)
    ? equipment
    : EquipmentItem.findIdByName(equipment);

  if (!equipmentId) {
    console.log(`unable to assign equipment id using ${equipment}`);
    return null;
  }

  const existingEquiment = mealPart.eqipment || [];
  mealPart.equipment = addToExistingEquipment(existingEquiment, equipmentId);
  return createOneMealPart(mealPart);
}

// TODO
// Should be able to  reorder or remove steps
async function addMethod(mealPart, index, step) {
  const { stepText } = step || {};

  if (!mealPart instanceof MealPart) {
    console.log("provide mealPart document as first argument");
    return null;
  }

  if (typeof stepText !== "string" || !stepText?.length) {
    console.log("method text is required");
    return null;
  }

  mealPart.method = sortMethodSteps([...mealPart.method, step]);
  return createOneMealPart(mealPart);
}

async function addRecipeIngredient(mealPart, recipeIngredient) {
  const { ingredient, measurement, amount } = recipeIngredient;

  if (!mealPart instanceof MealPart) {
    console.log("provide mealPart document as first argument");
    return null;
  }

  const validIngredient =
    ingredient instanceof Ingredient
      ? ingredient
      : await Ingredient.findById(ingredient).exec();
  const validMeasurement =
    measurement instanceof Measurement
      ? measurement
      : await Measurement.findById(measurement).exec();

  mealPart.recipeIngredients = mealPart?.recipeIngredients?.length
    ? [...mealPart.recipeIngredients, recipeIngredient]
    : [recipeIngredient];

  return createOneMealPart(mealPart);
}

module.exports = {
  createOneMealPart,
};
