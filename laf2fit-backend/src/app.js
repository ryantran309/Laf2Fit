const express = require("express");
require("express-async-errors");
const cors = require("cors");
const allRoutes = require("./routes");
const unhandleErrors = require("./middlewares/error-handling");

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/", allRoutes);
app.use(unhandleErrors);

module.exports = app;
