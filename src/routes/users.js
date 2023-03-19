const express = require("express");

const documentsController = require("../controllers/documents.controller");

const router = express.Router();

router.get("/:userId/documents", documentsController.getAll);
router.post("/:userId/documents", documentsController.createDocument);
router.get("/:userId/documents/:documentId", documentsController.getDocument);

module.exports = router;
