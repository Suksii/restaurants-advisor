import { Router } from "express";
import { authenticateUser } from "../middleware/UserProfile";
import {
  addRestaurant,
  getRestaurant,
  getRestaurants,
} from "../controllers/RestaurantController";

const router = Router();

router.post("/add", authenticateUser, addRestaurant);
router.get("/", getRestaurants);
router.get("/:id", getRestaurant);

export const restaurantRoute = router;
