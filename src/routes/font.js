const express = require("express");

const { getFontInS3 } = require("../service/s3utils");

const router = express.Router();

router.get("/:fontId", async (req, res, next) => {
  try {
    const { fontId } = req.params;
    const font = await getFontInS3(fontId, next);

    res.set("Content-Type", "font/woff2");
    res.send(font);
  } catch (error) {
    error.message = ERRORMESSAGE.ERROR_500;
    error.status = 500;

    return next(error);
  }
});

module.exports = router;
