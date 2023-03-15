const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.post("/sign-in", authController.signIn);
router.post("/sign-out", authController.signOut);

module.exports = router;
