const jwt = require("jsonwebtoken");

const CONFIG = require("../constants/config");
const User = require("../models/User");
const ERRORMESSAGE = require("../constants/error");

exports.sign = (user) => {
  return jwt.sign({ id: user._id }, CONFIG.JWT_SECRET, {
    expiresIn: "1h",
    algorithm: "HS256",
  });
};

exports.refresh = () => {
  return jwt.sign({}, CONFIG.JWT_SECRET, {
    expiresIn: "14d",
    algorithm: "HS256",
  });
};

exports.accessTokenVerify = (token) => {
  try {
    const decode = jwt.verify(token, CONFIG.JWT_SECRET);
    return {
      type: true,
      id: decode.id,
    };
  } catch (error) {
    return {
      type: false,
      message: error.message,
    };
  }
};

exports.refreshTokenVerify = async (token, id, next) => {
  try {
    const data = await User.findById(id);
    if (token === data.refreshToken) {
      try {
        jwt.verify(token, CONFIG.JWT_SECRET);
        return true;
      } catch (error) {
        return false;
      }
    }
    return false;
  } catch (error) {
    error.message = ERRORMESSAGE.ERROR_500;
    error.status = 500;

    next(error);
  }
};
