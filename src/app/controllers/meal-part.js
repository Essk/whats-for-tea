const express = require("express");
const Collection = require("./common");

module.exports = function (options) {
  const router = express.Router();
  const { port } = options;
  const apiUrl = (req) => {
    const { protocol, hostname } = req;
    return `${protocol}://${hostname}:${port}/api/`;
  };

  router.get("/", async (req, res) => {
    const url = apiUrl(req);
    const collection = Collection(url);

    const mealParts = await collection.getDocuments("meal-part");
    res.render("pages/meal-parts", {
      title: "Meal Parts",
      mealParts: mealParts,
    });
  });

  router.route("/new").get(async (req, res) => {
    const url = apiUrl(req);
    const collection = Collection(url);
    const ingredients = await collection.getDocuments("ingredient");
    const equipment = await collection.getDocuments("equipment");
    const data = { ingredients, equipment };
    res.render("pages/new-meal-part", {
      title: "New Meal Part",
      mealPart: {},
      equipment,
      ingredients,
      _data: JSON.stringify(data),
    });
  });

  router.route("/:slug").get(async (req, res) => {
    const url = apiUrl(req);
    const collection = Collection(url);
    const mealPart = await collection.getDocument(
      "meal-part",
      req?.params?.slug
    );
    const { name } = mealPart;
    res.render("pages/meal-part", { title: name, mealPart: mealPart });
  });

  return router;
};
