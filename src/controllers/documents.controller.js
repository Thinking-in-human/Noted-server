const User = require("../models/User");
const Pdf = require("../models/Pdf");
const { uploadDocumentInS3, getDocumentInS3 } = require("../service/s3utils");
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
      documents: userInfo?.pdfDocuments,
    });
  } catch (error) {
    error.message = ERRORMESSAGE.ERROR_500;
    error.status = 500;

    next(error);
  }
};

exports.getDocument = async (req, res, next) => {
  try {
    const { userId, documentId } = req.params;
    const pdfDocument = await getDocumentInS3(userId, documentId);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Length": pdfDocument?.length,
    });
    res.send(pdfDocument);
  } catch (error) {
    error.message = ERRORMESSAGE.ERROR_500;
    error.status = 500;

    next(error);
  }
};

exports.createDocument = async (req, res, next) => {
  const { userId } = req.params;
  const { file } = req.files;
  const { name, data } = file;

  try {
    await Pdf.create({ title: name, lastModifiedDate: new Date() });
    const createdPdf = await Pdf.findOne({ title: name }).lean().exec();
    const documentId = String(createdPdf._id);

    await uploadDocumentInS3(userId, documentId, data);
    await User.findByIdAndUpdate(userId, {
      $push: { pdfDocuments: documentId },
    })
      .lean()
      .exec();

    res.json({
      result: "ok",
      documents: documentId,
    });
  } catch (error) {
    error.message = ERRORMESSAGE.ERROR_500;
    error.status = 500;

    next(error);
  }
};

exports.saveDocument = async (req, res, next) => {
  try {
    const { file } = req.files;
    const { data } = file;
    const { userId, documentId } = req.params;

    await uploadDocumentInS3(userId, documentId, data);
    await Pdf.findByIdAndUpdate(documentId, { lastModifiedDate: new Date() });

    res.json({ result: "success" });
  } catch (error) {
    error.message = ERRORMESSAGE.ERROR_500;
    error.status = 500;

    next(error);
  }
};
