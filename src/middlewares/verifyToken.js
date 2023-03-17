const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const CONFIG = require("../config/constants");
const User = require("../models/User");
const { sign, verify, refreshVerify } = require("../service/jwtUtils");

exports.verfityToken = async (req, res, next) => {
  try {
    next();
  } catch (error) {
    next(error);
  }
};
