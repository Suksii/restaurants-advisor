import { NextFunction, Request, Response } from "express";
import Restaurant from "../models/Restaurant";
import { CustomError } from "../../utils/customError";

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
export const getRestaurants = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const restaunrants = await Restaurant.find().populate("user");
    res.status(200).json(restaunrants);
  } catch (error) {
    next();
  }
};
export const getRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id).populate("user");
    if (!restaurant) throw new CustomError("Restaurant not found", 404);
    res.status(200).json(restaurant);
  } catch (error) {
    next(error);
  }
};

export const deleteRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await Restaurant.findByIdAndDelete(id);
    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    next(error);
  }
};
