import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../utils/customError";

export const errorHandler = (
  err: Error | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): Response | undefined => {
  let statusCode = 500;
  let message = "Internal Server Error";
  if (err instanceof CustomError) {
    statusCode = err.statusCode;
    message = err.message;
  }
  if (process.env.NODE_ENV === "development") {
    return res.status(statusCode).json({
      status: "error",
      message,
      stack: err.stack,
      error: err,
    });
  }
  res.status(statusCode).json({
    status: "error",
    message,
  });
};
