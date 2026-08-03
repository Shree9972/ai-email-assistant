const express = require('express');
const emailController = require('../controllers/email.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/user-emails', authMiddleware, emailController.getUserEmailsController);

module.exports = router;