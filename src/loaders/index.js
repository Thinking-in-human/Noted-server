const mongooseLoader = require("./mongoose");
const middlewareLoader = require("./middlewares");
const routerLoader = require("./routers");
const errorHandlerLoader = require("./errorHandler");

const expressLoader = async (app) => {
  await mongooseLoader();
  await middlewareLoader(app);
  await routerLoader(app);
  await errorHandlerLoader(app);
};

module.exports = expressLoader;
