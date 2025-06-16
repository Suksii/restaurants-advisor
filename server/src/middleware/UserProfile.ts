import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../utils/customError";
import { jwtSecret } from "../../utils/constants";
import User from "../models/User";

type AuthRequest = Request & { user?: any };

type DedodedToken = {
  id: string;
  role: "user" | "admin" | "guest";
  username: string;
  iat: number;
  exp: number;
};

export const authenticateUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.cookies;
    if (!token) throw new CustomError("Unauthorized - No token");

    const decoded: any = jwt.verify(token, jwtSecret) as DedodedToken;

    console.log(decoded);

    const userProfile = await User.findById(decoded.id).select("-password");
    if (!userProfile) throw new CustomError("User not found", 404);
    req.user = userProfile;

    next();
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user)
      throw new CustomError("Unauthorized - No user profile found", 401);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
