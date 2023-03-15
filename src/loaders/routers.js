const indexRouter = require("../routes/index");
const authRouter = require("../routes/auth");

const routerLoader = async (app) => {
  app.use("/", indexRouter);
  app.use("/auth", authRouter);
};

module.exports = routerLoader;
