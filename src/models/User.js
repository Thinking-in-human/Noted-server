const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = Schema(
  {
    email: { type: String, trim: true, unique: true, required: true },
    avatarImgURL: { type: String, required: true },
    pdfDocuments: [{ type: Schema.Types.ObjectId, default: [], ref: "Pdf" }],
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("User", userSchema);
