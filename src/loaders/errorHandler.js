const createError = require("http-errors");

const errorHandlerLoader = async (app) => {
  app.use((req, res, next) => {
    next(createError(404));
  });

  app.use((err, req, res, next) => {
    res.locals.error.message =
      req.app.get("env") === "development" ? err.message : "error";
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.locals.error.stack =
      req.app.get("env") === "development" ? err.stack : {};

    res.status(err.status || 500);
    res.json({ message: res.locals.error });
  });
};
module.exports = errorHandlerLoader;
