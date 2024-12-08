const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        const connection = await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log("Successfully connected to database");
    } catch (error) {
        console.log("Db connection failed");
        process.exit(1);
    }
}


module.exports = connectDb;