import { Router } from "express";
import { authenticateUser } from "../middleware/UserProfile";
import { addRestaurant, getRestaurants } from "../controllers/RestaurantController";

const router = Router();

router.post("/add", authenticateUser, addRestaurant);
router.get("/", getRestaurants);

export const restaurantRoute = router;
