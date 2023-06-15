const User = require("../models/User");
const jwt = require("../service/jwtUtils");
const ERRORMESSAGE = require("../constants/error");

exports.signIn = async (req, res, next) => {
  try {
    const { email, avatarImgURL } = req.body;
    const member = await User.findOne({ email });

    if (!member) {
      await User.create({ email, avatarImgURL });
    }

    const user = await User.findOne({ email }).lean().exec();
    const accessToken = jwt.sign(user);
    const refreshToken = jwt.refresh();

    await User.findByIdAndUpdate(user._id, { refreshToken });

    res
      .status(201)
      .cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60,
        sameSite: "None",
        httpOnly: true,
        secure: true,
      })
      .cookie("refreshToken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: "None",
        httpOnly: true,
        secure: true,
      })
      .json({ result: "success", userId: user._id });
  } catch (error) {
    error.message = ERRORMESSAGE.ERROR_500;
    error.status = 500;

    next(error);
  }
};

exports.signOut = (req, res, next) => {
  try {
    Object.keys(req.cookies).forEach((cookieName) => {
      res.clearCookie(cookieName, { httpOnly: true });
    });

    res.json({
      result: "ok",
    });
  } catch (error) {
    error.message = ERRORMESSAGE.ERROR_500;
    error.status = 500;

    next(error);
  }
};
