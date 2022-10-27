const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const api = require("./api");

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/api", api);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
