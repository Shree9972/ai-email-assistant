const express = require("express");

const healthRoutes = require("./routes/health.routes");

const userRoutes = require("./routes/user.routes");

const authRoutes = require("./routes/auth.routes");

const app = express();

/*
|--------------------------------------------------------------------------
| Global Middleware
|--------------------------------------------------------------------------
*/

// Parses incoming JSON requests
app.use(express.json());

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

module.exports = app;