const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");

const { getUserMessages , getUserMessage } = require("../controllers/gmail.controller");

router.get( "/messages", authMiddleware, getUserMessages );

router.get( "/messages/:id", authMiddleware, getUserMessage);

module.exports = router;