import mongoose from "mongoose";
import { mongoUri } from "../utils/constants";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri as string);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Connection failed:", error);
    throw error;
  }
};

export default connectDB;
