import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "../database/connection";
import { userRoute } from "./routes/UserRoute";
import { errorHandler } from "./middleware/ErrorHandler";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));
app.use(cookieParser());

connectDB();

app.get("/", async (req: Request, res: Response) => {
  res.status(200).send("Server Running");
});

app.use("/api/users", userRoute);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  try {
    console.log("Server is running on port:", process.env.PORT);
  } catch (error) {
    console.error(error);
  }
});
