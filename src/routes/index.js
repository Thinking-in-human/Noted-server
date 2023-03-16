const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({ result: "pdf" });
});

module.exports = router;
