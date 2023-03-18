const express = require("express");

const documentsController = require("../controllers/documents.controller");

const router = express.Router();

router.get("/:userId/documents", documentsController.getAll);
router.get(
  "/:userId/documents/:documentTitle",
  documentsController.getDocument
);

module.exports = router;
