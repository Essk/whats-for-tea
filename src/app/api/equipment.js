const express = require("express");
const {
  getEquipmentItems,
  getEquipmentItem,
  createOneEquipmentItem,
  deleteEquipmentItem,
} = require("../../models/equipment");
const router = express.Router();

router.get("/", async (req, res) => {
  res.json(await getEquipmentItems());
});

router
  .route("/:slug")
  .get(async (req, res) => {
    res.json(await getEquipmentItem(req?.params?.slug));
  })
  .put(async (req, res) => {
    res.json(await createOneEquipmentItem(req.query));
  })
  .delete((req, res) => {
    res.json(deleteEquipmentItem(req?.params?.slug));
  });

module.exports = router;
