import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // Standalone / some Atlas tiers do not support retryable writes; avoids
      // "Please add retryWrites=false to your connection string."
      retryWrites: false
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
