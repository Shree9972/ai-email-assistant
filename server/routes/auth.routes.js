const express = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/google", authController.getGoogleAuth);
router.get("/google/callback", authController.googleCallback);

router.get("/me", authMiddleware, authController.getCurrentUser);

module.exports = router;