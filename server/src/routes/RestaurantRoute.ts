import { Router } from "express";
import { authenticateUser } from "../middleware/UserProfile";
import { addRestaurant } from "../controllers/RestaurantController";

const router = Router();

router.post("/add", authenticateUser, addRestaurant);

export const restaurantRoute = router;
