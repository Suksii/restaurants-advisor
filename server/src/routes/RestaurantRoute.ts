import { Router } from "express";
import { authenticateUser } from "../middleware/UserProfile";
import {
  addRestaurant,
  deleteRestaurant,
  getRestaurant,
  getRestaurants,
  updateRestaurant,
} from "../controllers/RestaurantController";

const router = Router();

router.post("/add", authenticateUser, addRestaurant);
router.get("/", getRestaurants);
router.get("/:id", getRestaurant);
router.delete("/delete/:id", deleteRestaurant);
router.put("/update/:id", updateRestaurant);

export const restaurantRoute = router;
