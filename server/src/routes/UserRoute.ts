import { Router } from "express";
import { registerUser } from "../controllers/UserController.js";

const router = Router();

router.post("/register", registerUser);

export const userRoute = router;
