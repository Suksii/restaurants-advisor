import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/UserController";
import { authenticateUser, getCurrentUser } from "../middleware/UserProfile";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", authenticateUser, getCurrentUser);

export const userRoute = router;
