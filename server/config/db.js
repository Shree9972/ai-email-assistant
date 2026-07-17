const mongoose = require("mongoose");

const { MONGODB_URI } = process.env;

const connectDB = async () => {

    try {

        await mongoose.connect(MONGODB_URI);

        console.log("✅ MongoDB Connected");

    } 
    catch (error) 
    {

        console.error("❌ MongoDB Connection Failed");
        console.error(error.message);

        process.exit(1);
    }
};

module.exports = connectDB;