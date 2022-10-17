const mongoose = require("mongoose");
const { createOneEquipmentItem } = require("../src/models/equipment");
const { atlas } = require("../db-connect/connect.json");
const { "connect-string": connectString } = atlas;

(async () => {
  const connector = await mongoose.connect(connectString);
  const equipmentItem = {};
  const name = process.env.npm_config_name;

  if (typeof name !== "string" || !name?.length) {
    process.exitCode = 1;
    throw new Error(`Equipment name is required`);
  }
  await createOneEquipmentItem({ name });
  process.exit(0);
})();
