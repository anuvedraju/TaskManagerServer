const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@taskmanager.2svzs.mongodb.net/?retryWrites=true&w=majority&appName=TaskManager`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );

    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
