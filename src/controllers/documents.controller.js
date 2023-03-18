const User = require("../models/User");
const Pdf = require("../models/Pdf");
const { getDocumentInS3 } = require("../service/s3utils");
const ERRORMESSAGE = require("../constants/error");

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
    error.message = ERRORMESSAGE.ERROR_500;
    error.status = 500;

    next(error);
  }
};

exports.getDocument = async (req, res, next) => {
  try {
    const { documentTitle } = req.params;

    const pdfDocument = await getDocumentInS3(documentTitle, next);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Length": pdfDocument.length,
    });

    res.send(pdfDocument);
  } catch (error) {
    error.message = ERRORMESSAGE.ERROR_500;
    error.status = 500;

    return next(error);
  }
};
