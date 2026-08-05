const express = require('express');
const aiController = require('../controllers/ai.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// Route to summarize emails
router.get('/summary/today', authMiddleware, aiController.summarizeEmailsController);

module.exports = router;