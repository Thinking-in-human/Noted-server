const User = require("../models/User");
const jwt = require("../service/jwtUtils");

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

exports.signOut = async (req, res, next) => {
  try {
    // write your code ..
  } catch (error) {
    next(error);
  }
};
