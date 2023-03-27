const express = require("express");

const documentsController = require("../controllers/documents.controller");

const router = express.Router();

router.get("/:userId/documents", documentsController.getAll);
router.post("/:userId/documents/new", documentsController.createDocument);
router.get("/:userId/documents/:documentId", documentsController.getDocument);
router.put("/:userId/documents/:documentId", documentsController.saveDocument);

module.exports = router;
