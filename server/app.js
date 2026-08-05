const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json());

const healthRoutes = require("./routes/health.routes");

const userRoutes = require("./routes/user.routes");

const authRoutes = require("./routes/auth.routes");

const gmailRoutes = require("./routes/gmail.routes");

const emailRoutes = require("./routes/email.routes");

const aiRoutes = require("./routes/ai.routes");

//to parse cookies from incoming requests

/*
|--------------------------------------------------------------------------
| Global Middleware
|--------------------------------------------------------------------------
*/

// Parses incoming JSON requests

// Simple Logger Middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

//user routes
app.use("/api/users", userRoutes);

//auth routes
app.use("/api/auth", authRoutes);

app.use("/api/health", healthRoutes);

app.use("/api/gmail", gmailRoutes);

app.use("/api/emails", emailRoutes);

app.use("/api/ai", aiRoutes);

module.exports = app;