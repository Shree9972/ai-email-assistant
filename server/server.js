const app = require("./app");
const { PORT } = require("./config/env");
const connectDB = require("./config/db");

const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const startServer = async () => {
    
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};

startServer();