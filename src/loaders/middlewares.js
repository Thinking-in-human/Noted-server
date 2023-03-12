const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const middlewareLoader = async (app) => {
  app.use(logger(app.get("env") === "development" ? "dev" : "combined"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};

module.exports = middlewareLoader;
