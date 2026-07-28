const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.get("/google", authController.getGoogleAuth);
router.get("/google/callback", authController.googleCallback);

module.exports = router;