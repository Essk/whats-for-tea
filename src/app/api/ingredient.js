const express = require("express");
const {
  getIngredient,
  getIngredients,
  createOneIngredient,
  deleteIngredient,
} = require("../../models/ingredients");
const router = express.Router();

router.get("/", async (req, res) => {
  const ingredients = await getIngredients();
  res.json(ingredients);
});

router
  .route("/:slug")
  .get(async (req, res) => {
    res.json(await getIngredient(req?.params?.slug));
  })
  .put(async (req, res) => {
    res.json(await createOneIngredient(req.query));
  })
  .delete((req, res) => {
    res.json(deleteIngredient(req?.params?.slug));
  });

module.exports = router;
