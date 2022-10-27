const { isValidObjectId, model } = require("mongoose");
const { measurementSchema } = require("../schema");

// set up model
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
    !isValidObjectId(parentMeasure) &&
    typeof parentMeasure === "string"
  ) {
    const parentId = await Measurement.findIdByUnitName(parentMeasure);
    measurementToUpdate.parentMeasure = parentId ? parentId : null;
  }

  return Measurement.findOneAndUpdate(query, measurementToUpdate, options);
}

async function deleteMeasurement(slug) {
  return Measurement.findOneAndDelete({ slug });
}

async function getMeasurement(slug) {
  return Measurement.findOne({ slug });
}

async function getMeasurements() {
  return Measurement.find();
}

module.exports = {
  getMeasurement,
  getMeasurements,
  deleteMeasurement,
  createOneMeasurement,
};
