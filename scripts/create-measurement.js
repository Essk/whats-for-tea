const mongoose = require("mongoose");
const { createOneMeasurement } = require("../src/models/measurements");
const { atlas } = require("../db-connect/connect.json");
const { "connect-string": connectString } = atlas;

(async () => {
  const connector = await mongoose.connect(connectString);
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
