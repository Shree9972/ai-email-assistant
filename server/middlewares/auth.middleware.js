const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        let token;

        if (authHeader?.startsWith("Bearer ")) 
        {
            token = authHeader.split(" ")[1];
        } 
        else if (req.cookies?.token) 
        {
            token = req.cookies.token;
        }

        //console.log("This is from header.cookie",req.headers.cookie);
        //console.log("This is from cookies",req.cookies);

        if (!token) 
        {
            return res.status(401).json({
                success: false,
                message: "No token provided."
            });
        }
        // Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded.userId) 
        {
            return res.status(401).json({
                success: false,
                message: "Invalid token payload."
            });
        }

        // Find user
        const user = await User.findById(decoded.userId);

        if (!user) 
        {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        req.user = user;

        next();

    } 
    catch (error) 
    {

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Token has expired. Please log in again."
            });
        }

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                success: false,
                message: "Invalid authentication token."
            });
        }

        console.error("Auth Middleware Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};

module.exports = authMiddleware;