import User from "../models/User";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";

type RegisterUserRequestBody = {
  username: string;
  email: string;
  password: string;
};

export const registerUser = async (
  req: Request<unknown, unknown, RegisterUserRequestBody>,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { username, email, password } = req.body;
  try {
    const emailExists = await User.findOne({ email });
    const usernameExists = await User.findOne({ username });
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    if (emailExists) {
      return res.status(400).json({ message: "Email already in use!" });
    }
    if (usernameExists) {
      return res.status(400).json({ message: "Username already in use!" });
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
