import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import { userRoute } from "./src/routes/UserRoute";
import { errorHandler } from "./src/middleware/ErrorHandler";
import connectDB from "./database/connection";
import { clientOrigin, port } from "./utils/constants";

const app = express();

app.use(express.json());
app.use(cors({ origin: clientOrigin, credentials: true }));
app.use(cookieParser());

connectDB();

app.get("/", async (req: Request, res: Response) => {
  res.status(200).send("Server Running");
});

app.use("/api/users", userRoute);

app.use((err: any, req: Request, res: Response, next: express.NextFunction) => {
  errorHandler(err, req, res, next);
});

app.listen(port, () => {
  try {
    console.log("Server is running on port:", port);
  } catch (error) {
    console.error(error);
  }
});
