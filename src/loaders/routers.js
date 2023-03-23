const indexRouter = require("../routes/index");
const authRouter = require("../routes/auth");
const usersRouter = require("../routes/users");
const fontRouter = require("../routes/font");
const { verifyToken } = require("../middlewares/verifyToken");

const routerLoader = async (app) => {
  app.use("/", indexRouter);
  app.use("/auth", authRouter);
  app.use("/users", verifyToken, usersRouter);
  app.use("/fonts", verifyToken, fontRouter);
};

module.exports = routerLoader;
