const indexRouter = require("../routes/index");
const authRouter = require("../routes/auth");
const usersRouter = require("../routes/users");

const routerLoader = async (app) => {
  app.use("/", indexRouter);
  app.use("/auth", authRouter);
  app.use("/users", usersRouter);
};

module.exports = routerLoader;
