const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const { getUserMessages } = require("../controllers/gmail.controller");

router.get( "/messages", authMiddleware, getUserMessages );

module.exports = router;