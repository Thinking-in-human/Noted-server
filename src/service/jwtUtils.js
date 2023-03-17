const jwt = require("jsonwebtoken");

const CONFIG = require("../config/constants");
const User = require("../models/User");

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

exports.verify = (token) => {
  let decode = null;
  try {
    decode = jwt.verify(token, CONFIG.JWT_SECRET);
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

exports.refreshVerify = async (token, id) => {
  try {
    const data = await User.findById(id);
    if (token === data.refreshToken) {
      try {
        jwt.verify(token, CONFIG.JWT_SECRET);
        return true;
      } catch (error) {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
