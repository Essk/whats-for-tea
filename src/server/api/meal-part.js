const express = require("express");
const {
  getMealParts,
  getMealPart,
  createOneMealPart,
  deleteMealPart,
} = require("../../models/meal-parts");
const router = express.Router();

router.get("/", async (req, res) => {
  res.json(await getMealParts());
});

router
  .route("/:slug")
  .get(async (req, res) => {
    res.json(await getMealPart(req?.params?.slug));
  })
  .put(async (req, res) => {
    res.json(await createOneMealPart(req.query));
  })
  .delete((req, res) => {
    res.json(deleteMealPart(req?.params?.slug));
  });

module.exports = router;
