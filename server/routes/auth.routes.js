const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.get("/google", authController.getGoogleAuth);

module.exports = router;