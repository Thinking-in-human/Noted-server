const jwt = require("jsonwebtoken");

const CONFIG = require("../config/constants");
const User = require("../models/User");

exports.signIn = async (req, res, next) => {
  try {
    const { email, avatarImgURL } = req.body;
    const member = await User.findOne({ email });

    if (!member) {
      await User.create({ email, avatarImgURL });
    }

    const user = await User.findOne({ email }).lean().exec();
    const accessToken = jwt.sign({ id: user._id }, CONFIG.JWT_SECRET, {
      expiresIn: "1h",
      algorithm: "HS256",
    });
    const refreshToken = jwt.sign({}, CONFIG.JWT_SECRET, {
      expiresIn: "14d",
      algorithm: "HS256",
    });

    await User.findByIdAndUpdate(user._id, { refreshToken });

    res
      .status(201)
      .cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
      })
      .cookie("refreshToken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      })
      .json({ result: "success" });
  } catch (error) {
    error.message = "Internal Server Error";
    error.status = 500;

    next(error);
  }
};

exports.signOut = async function (req, res, next) {
  try {
    //write your code ..
  } catch (error) {
    next(error);
  }
};
