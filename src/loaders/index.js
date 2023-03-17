const mongooseLoader = require("./mongoose");
const expressLoader = require("./express");
const routerLoader = require("./routers");
const errorHandlerLoader = require("./errorHandler");

const appLoader = async (app) => {
  await mongooseLoader();
  await expressLoader(app);
  await routerLoader(app);
  await errorHandlerLoader(app);
};

module.exports = appLoader;
