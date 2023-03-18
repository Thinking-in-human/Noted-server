const express = require("express");
const { uploadDocumentInS3 } = require("../service/s3utils");
const Pdf = require("../models/Pdf");
const User = require("../models/User");

const router = express.Router();

router.get("/", async (req, res, next) => {
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
});

router.post("/", async (req, res, next) => {
  const { file } = req.files;

  const { name, data } = file;
  const documentId = `username_${name}`;
  const storageUrl = `documents/${documentId}.pdf`;

  // uploading to S3
  await uploadDocumentInS3(documentId, data, next);

  // save meta data
  await Pdf.create({ title: "", lastModifiedDate: new Date(), storageUrl });
  res.send(201);
});

router.get("/:title", async (req, res, next) => {
  const { title } = req.params;
  const pdf = await Pdf.findOne({ title });
  res.json(pdf);
});

module.exports = router;
