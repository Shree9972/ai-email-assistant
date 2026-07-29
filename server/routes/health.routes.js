const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");

router.get("/check-health", (req, res) => {

    res.status(200).json({
        success: true,
        message: "Server is running"
    });
    
});

router.get("/auth/me", authMiddleware, (req, res) => {

    res.status(200).json({
        success: true,
        user: req.user
    });

});

module.exports = router;