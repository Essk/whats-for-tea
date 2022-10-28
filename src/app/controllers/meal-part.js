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
    res.render("meal-parts", { mealParts: mealParts });
  });

  router.route("/:slug").get(async (req, res) => {
    const url = apiUrl(req);
    const collection = Collection(url);
    const mealPart = await collection.getDocument(
      "meal-part",
      req?.params?.slug
    );
    res.render("meal-part", { mealPart: mealPart });
  });
  return router;
};
