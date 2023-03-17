const express = require("express");

const documentsController = require("../controllers/documents.controller");

const router = express.Router();

router.get("/:userId/documents", documentsController.getAll);

module.exports = router;
