const { model, default: mongoose } = require("mongoose");
const { measurementSchema } = require("../src/schema");
const { atlas } = require("../db-connect/connect.json");
const { "connect-string": connectString } = atlas;

// set up models
const Measurement = model("Measurement", measurementSchema);

async function createOneMeasurement(measurement) {
  const { unitName, parentMeasure } = measurement;
  // contents can be changed from initial input arg
  const measurementToUpdate = { ...measurement };
  const query = { unitName: unitName };
  const options = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  };
  // check to see if parent measure was passed in as objectID or a string
  // if it was a string, look up & substitute the corresponding objectID
  if (
    parentMeasure &&
    !mongoose.isValidObjectId(parentMeasure) &&
    typeof parentMeasure === "string"
  ) {
    const parentId = await Measurement.findIdByUnitName(parentMeasure);
    measurementToUpdate.parentMeasure = parentId ? parentId : null;
  }

  return Measurement.findOneAndUpdate(query, measurementToUpdate, options);
}

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

  process.exit(0);
})();
