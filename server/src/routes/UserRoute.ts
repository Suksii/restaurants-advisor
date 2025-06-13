import { Router } from "express";
import { loginUser, registerUser } from "../controllers/UserController";
import { authenticateUser, getCurrentUser } from "../middleware/UserProfile";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authenticateUser, getCurrentUser);

export const userRoute = router;
