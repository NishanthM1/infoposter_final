const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log(`Attempting to connect to MongoDB at: ${process.env.MONGO_URI}`);
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message);
    console.error(err); // Log the full error object for more details
    process.exit(1);
  }
};

module.exports = connectDB;