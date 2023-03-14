const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, match: /[A-Za-z0-9_-]/g },
    lastModifiedDate: { type: Date, required: true },
    storageUrl: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Pdf", pdfSchema);
