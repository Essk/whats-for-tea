const { model, default: mongoose } = require("mongoose");
const { measurementSchema } = require("../src/schema");
const { atlas } = require("../db-connect/connect.json");
const { "connect-string": connectString } = atlas;

const mode = process.env.npm_config_mode;

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

async function setupCommon() {
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
}

(async () => {
  const connector = await mongoose.connect(connectString);
  if (mode === "common") {
    await setupCommon();
  }

  const measurement = {};

  const measurementProperties = [
    {
      argName: "unitname",
      name: "unitName",
      required: true,
    },
    {
      argName: "notationsingular",
      name: "notationSingular",
      required: true,
    },
    {
      argName: "notationplural",
      name: "notationPlural",
      required: true,
    },
    {
      argName: "parentmeasure",
      name: "parentMeasure",
      required: false,
    },
    {
      argName: "parentthreshold",
      name: "parentThreshold",
      required: false,
      transform: (value) => {
        const int = parseInt(value, 10);
        if (isNaN(int)) {
          console.warn(`${value} cannot be transformed to an integer`);
          return null;
        }
        return int;
      },
    },
  ];

  measurementProperties.forEach((property) => {
    const { argName, name, required, transform } = property;
    const envVarName = `npm_config_${argName}`;
    const value = process.env[envVarName];
    // console.log(process.env.npm_config_unitName);
    if (typeof value !== "undefined") {
      measurement[name] = value;
    } else if (!required) {
      measurement[name] = null;
    } else {
      process.exitCode = 1;
      throw new Error(`${name} is required`);
    }
    if (value && typeof transform === "function") {
      const newValue = transform(value);
      measurement[name] = newValue;
    }
  });
  await createOneMeasurement(measurement);
  process.exit(0);
})();