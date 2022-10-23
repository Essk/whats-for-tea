const express = require("express");
const router = express.Router();
const ingredient = require("./ingredient");

router.use("/ingredient", ingredient);
/*
router.get("/", (req, res) => {
  res.send("this might 404?");
});
*/

module.exports = router;
