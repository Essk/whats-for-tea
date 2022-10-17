const mongoose = require("mongoose");
const { createOneMeasurement } = require("../src/models/measurements");
const { atlas } = require("../db-connect/connect.json");
const { "connect-string": connectString } = atlas;

(async () => {
  const connector = await mongoose.connect(connectString);

  // kg
  await createOneMeasurement({
    unitName: "kilogram",
    notationSingular: "kg",
    notationPlural: "kg",
  });

  // g
  await createOneMeasurement({
    unitName: "gram",
    notationSingular: "g",
    notationPlural: "g",
    parentMeasure: "kilogram",
    parentThreshold: 1000,
  });

  // l
  await createOneMeasurement({
    unitName: "litre",
    notationSingular: "l",
    notationPlural: "l",
  });

  // ml
  await createOneMeasurement({
    unitName: "millitre",
    notationSingular: "ml",
    notationPlural: "ml",
    parentMeasure: "litre",
    parentThreshold: 1000,
  });

  // tbsp
  await createOneMeasurement({
    unitName: "tablespoon",
    notationSingular: "tbsp",
    notationPlural: "tbsp",
  });

  // tsp
  await createOneMeasurement({
    unitName: "teaspoon",
    notationSingular: "tsp",
    notationPlural: "tsp",
    parentMeasure: "tablespoon",
    parentThreshold: 3,
  });

  // each
  await createOneMeasurement({
    unitName: "each",
    notationSingular: "pc",
    notationPlural: "pcs",
  });

  process.exit(0);
})();
