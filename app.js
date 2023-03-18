const express = require("express");
const appLoader = require("./src/loaders/index");

const app = express();

(async () => {
  await appLoader(app);
})();

module.exports = app;
