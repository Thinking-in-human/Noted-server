const mongoose = require("mongoose");

const { Schema } = mongoose;

const pdfSchema = Schema(
  {
    title: { type: String, required: true, match: /^[a-zA-Z0-9_-]+$/ },
    lastModifiedDate: { type: Date, required: true },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Pdf", pdfSchema);
