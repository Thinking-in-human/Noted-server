const mongooseLoader = require("./mongoose");
const middlewareLoader = require("./middlewares");
const routerLoader = require("./routers");
const errorHandlerLoader = require("./errorHandler");
const s3ConfigLoader = require("./s3Storage");

const expressLoader = async (app) => {
  await mongooseLoader();
  await s3ConfigLoader();
  await middlewareLoader(app);
  await routerLoader(app);
  await errorHandlerLoader(app);
};

module.exports = expressLoader;
