const { model } = require("mongoose");
const { equipmentItemSchema } = require("../schema");

// set up model
const EquipmentItem = model("EquipmentItem", equipmentItemSchema);

async function createOneEquipmentItem(equipmentItem) {
  const { name } = equipmentItem;
  const query = { name };
  const options = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  };

  return EquipmentItem.findOneAndUpdate(query, { name }, options);
}

module.exports = {
  createOneEquipmentItem,
};
