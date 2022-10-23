const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("list ingredients");
});

router
  .route("/:slug")
  .get((req, res) => {
    res.send(`get ingredient with slug ${req.params.slug}`);
  })
  .put((req, res) => {
    res.send(`update ingredient with slug ${req.params.slug}`);
  })
  .delete((req, res) => {
    res.send(`delete ingredient with slug ${req.params.slug}`);
  });

module.exports = router;
