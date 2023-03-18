const express = require("express");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const logger = require("morgan");
const cors = require("cors");

const expressLoader = async (app) => {
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(logger(app.get("env") === "development" ? "dev" : "combined"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(fileUpload());
  app.use(cookieParser());
};

module.exports = expressLoader;
