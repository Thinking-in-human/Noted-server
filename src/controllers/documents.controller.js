const User = require("../models/User");
const Pdf = require("../models/Pdf");
const { uploadDocumentInS3, getDocumentInS3 } = require("../service/s3utils");
const ERRORMESSAGE = require("../constants/error");

exports.getAll = async (req, res, next) => {
  try {
    const { userId } = req.params;
    console.log(userId);
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
    const { documentId, userId } = req.params;

    const pdfDocument = await getDocumentInS3(documentId, userId, next);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Length": pdfDocument?.length,
    });

    res.send(pdfDocument);
  } catch (error) {
    error.message = ERRORMESSAGE.ERROR_500;
    error.status = 500;

    return next(error);
  }
};

exports.createDocument = async (req, res, next) => {
  console.log("server_Post");
  console.log("req", req.files);
  const { userId } = req.params;
  const { file } = req.files;

  // const userId = req.user;
  const { name, data } = file;
  // save meta data (pdf) in mongodb
  await Pdf.create({ title: name, lastModifiedDate: new Date() });
  const createdPdf = await Pdf.findOne({ title: name }).lean().exec();
  /* eslint-disabled */
  const documentId = String(createdPdf._id);
  console.log("documentId", createdPdf, documentId);
  // uploading to S3
  await uploadDocumentInS3(documentId, userId, data, next);

  // userid mongodb에서 찾아서 pdf documents 업데이트
  const userInfo = await User.findById(userId);
  console.log(userInfo);
  userInfo.pdfDocuments.push(documentId);
  await userInfo.save();

  res.json({
    result: "ok",
    documents: documentId,
  });
};
