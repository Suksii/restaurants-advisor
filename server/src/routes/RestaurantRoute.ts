import { Router } from "express";
import { authenticateUser } from "../middleware/UserProfile";
import {
  addRestaurant,
  deleteRestaurant,
  getRestaurant,
  getRestaurants,
} from "../controllers/RestaurantController";

const router = Router();

router.post("/add", authenticateUser, addRestaurant);
router.get("/", getRestaurants);
router.get("/:id", getRestaurant);
router.delete("/delete/:id", deleteRestaurant);

export const restaurantRoute = router;
