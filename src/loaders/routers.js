const indexRouter = require("../routes/index");
const authRouter = require("../routes/auth");
const usersRouter = require("../routes/users");
const documentsRouter = require("../routes/documents");
const { verfityToken } = require("../middlewares/verifyToken");

const routerLoader = async (app) => {
  app.use("/", indexRouter);
  app.use("/auth", authRouter);
  app.use("/documents", documentsRouter);
  app.use("/users", verfityToken, usersRouter);
};

module.exports = routerLoader;
