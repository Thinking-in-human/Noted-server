const express = require("express");
const expressLoader = require("./src/loaders/index");

const app = express();

(async () => {
  await expressLoader(app);
})();

module.exports = app;
