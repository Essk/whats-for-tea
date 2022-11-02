const { response } = require("express");
const express = require("express");
const cors = require("cors");
const path = require("path");
const api = require("./api");
const fetch = require("node-fetch");
const mealPartRoute = require("./controllers/meal-part");

const app = express();
const port = 3000;

app.engine(".html", require("ejs").__express);

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "html");

app.use(cors());

app.use("/meal-part", mealPartRoute({ port }));

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/api", api);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
