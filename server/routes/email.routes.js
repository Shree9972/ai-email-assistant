const express = require('express');
const emailController = require('../controllers/email.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', authMiddleware, emailController.getUserEmailsController);

router.get('/:id', authMiddleware, emailController.getEmailByIdController);

module.exports = router;