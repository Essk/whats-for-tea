const express = require("express");
const {
  getMeasurements,
  getMeasurement,
  createOneMeasurement,
  deleteMeasurement,
} = require("../../models/measurements");
const router = express.Router();

router.get("/", async (req, res) => {
  res.json(await getMeasurements());
});

router
  .route("/:slug")
  .get(async (req, res) => {
    res.json(await getMeasurement(req?.params?.slug));
  })
  .put(async (req, res) => {
    res.json(await createOneMeasurement(req.query));
  })
  .delete((req, res) => {
    res.json(deleteMeasurement(req?.params?.slug));
  });

module.exports = router;
