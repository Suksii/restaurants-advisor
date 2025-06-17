import { NextFunction, Request, Response } from "express";
import Restaurant from "../models/Restaurant";

type AuthRequest = Request & { user?: any };

export const addRestaurant = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { name, images, description, category, location } = req.body;

  try {
    const newRestaurant = await Restaurant.create({
      name,
      images,
      description,
      category,
      location,
      user: req.user.id,
    });

    res.status(201).json({
      restaurant: newRestaurant,
      message: "Restaurant added successfully",
    });
  } catch (error) {
    next();
  }
};
