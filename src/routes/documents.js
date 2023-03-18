const express = require("express");
const Pdf = require("../models/Pdf");

const router = express.Router();

router.get("/:title", async (req, res, next) => {
  const { title } = req.params;

  const pdf = await Pdf.findOne({ title });

  res.json(pdf);
});

module.exports = router;
