import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../utils/customError";
import User from "../models/User";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../../utils/constants";

type RegisterUserRequestBody = {
  username: string;
  email: string;
  password: string;
  role: string;
};

export const registerUser = async (
  req: Request<{}, {}, RegisterUserRequestBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, email, password, role } = req.body;
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
      role: role || "user",
    });
    res
      .status(201)
      .json({ user: newUser, message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) throw new CustomError("User doesn't exist", 404);

    const passMatch = bcrypt.compareSync(password, user.password);
    if (!passMatch) throw new CustomError("Password isn't valid", 406);

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role,
      },
      jwtSecret as string,
      { expiresIn: "1d" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ user, message: "Login successful" });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    res.clearCookie("token").json({ message: "Logged out" });
  } catch (error) {
    next(error);
  }
};

export const deactivateAcount = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(
      id,
      {
        isActive: false,
      },
      { new: true }
    );
    if (!user) throw new CustomError("User not found", 404);

    if (!user.isActive)
      throw new CustomError("Account has already been deactivated", 400);

    res.status(200).json({ message: "Account deactivated successfully" });
  } catch (error) {
    next(error);
  }
};
