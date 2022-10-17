const mongoose = require("mongoose");
const { createOneIngredient } = require("../src/models/ingredients");
const { atlas } = require("../db-connect/connect.json");
const { "connect-string": connectString } = atlas;

(async () => {
  const connector = await mongoose.connect(connectString);
  const ingredient = {};
  const name = process.env.npm_config_name;

  if (typeof name !== "string" || !name?.length) {
    process.exitCode = 1;
    throw new Error(`Ingredient name is required`);
  }
  await createOneIngredient({ name });
  process.exit(0);
})();
