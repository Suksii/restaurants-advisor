import User from "../models/User";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { CustomError } from "../../utils/customError";

type RegisterUserRequestBody = {
  username: string;
  email: string;
  password: string;
};

export const registerUser = async (
  req: Request<{}, {}, RegisterUserRequestBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, email, password } = req.body;
  try {
    const emailExists = await User.findOne({ email });
    const usernameExists = await User.findOne({ username });
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    if (emailExists) {
      throw new CustomError("Email already in use", 400);
    }
    if (usernameExists) {
      throw new CustomError("Username already in use", 400);
    }

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res
      .status(201)
      .json({ user: newUser, message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};
