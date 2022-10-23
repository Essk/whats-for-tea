const express = require("express");
const app = express();
const port = 3000;
const api = require("./api");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", api);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
