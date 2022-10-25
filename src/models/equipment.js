const { model } = require("mongoose");
const { equipmentItemSchema } = require("../schema");

// set up model
const EquipmentItem = model("EquipmentItem", equipmentItemSchema);

async function createOneEquipmentItem(equipmentItem) {
  const { name } = equipmentItem;
  if (!name) {
    return {};
  }
  const query = { name };
  const options = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  };

  return EquipmentItem.findOneAndUpdate(query, { name }, options);
}

async function deleteEquipmentItem(slug) {
  return EquipmentItem.findOneAndDelete({ slug });
}

async function getEquipmentItem(slug) {
  return EquipmentItem.findOne({ slug });
}

async function getEquipmentItems() {
  return EquipmentItem.find();
}

module.exports = {
  getEquipmentItem,
  getEquipmentItems,
  deleteEquipmentItem,
  createOneEquipmentItem,
};
