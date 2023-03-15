const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new mongoose.Schema(
  {
    email: { type: String, trim: true, unique: true, required: true },
    avatarImgUrl: { type: String, required: true },
    pdfDocuments: { type: Schema.Types.ObjectId, ref: "Pdf" },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("User", userSchema);
