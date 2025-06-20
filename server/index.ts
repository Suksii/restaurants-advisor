import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import { userRoute } from "./src/routes/UserRoute";
import { restaurantRoute } from "./src/routes/RestaurantRoute";
import { errorHandler } from "./src/middleware/ErrorHandler";
import connectDB from "./database/connection";
import { clientOrigin, port } from "./utils/constants";
import { uploadRoute } from "./src/routes/UploadRoute";

connectDB();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: clientOrigin, credentials: true }));

app.get("/proba", (req: Request, res: Response) => {
  res.status(200).send("Server Running");
});

app.use("/api/users", userRoute);
app.use("/api/restaurants", restaurantRoute);
app.use("/api/upload", uploadRoute);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

app.listen(port, () => {
  try {
    console.log("Server is running on port:", port);
  } catch (error) {
    console.error(error);
  }
});
