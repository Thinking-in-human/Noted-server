const User = require("../models/User");

exports.getAll = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const userInfo = await User.findById(userId)
      .populate("pdfDocuments")
      .lean()
      .exec();

    res.json({
      result: "ok",
      documents: userInfo.pdfDocuments,
    });
  } catch (error) {
    error.message = "Internal Server Error";
    error.status = 500;

    next(error);
  }
};
