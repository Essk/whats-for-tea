const express = require("express");
const router = express.Router();
const ingredient = require("./ingredient");
const equipment = require("./equipment");
const measurement = require("./measurement");
const mealParts = require("./meal-part");
const mongoose = require("mongoose");
const { atlas } = require("../../../db-connect/connect.json");
const { "connect-string": connectString } = atlas;

router.use(async (req, res, next) => {
  const connector = await mongoose.connect(connectString);
  next();
});

router.use("/ingredient", ingredient);
router.use("/equipment", equipment);
router.use("/measurement", measurement);
router.use("/meal-part", mealParts);

module.exports = router;
