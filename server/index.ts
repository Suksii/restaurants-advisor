import express from "express";
import cors from "cors";
import connectDB from "./database/connection";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

connectDB();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello!" });
});

app.listen(process.env.PORT, () => {
  try {
    console.log("Server is running on port: ", process.env.PORT);
  } catch (error) {
    console.error(error);
  }
});
