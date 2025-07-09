import { Router } from "express";
import {
  activateAcount,
  changePassword,
  deactivateAcount,
  getUsers,
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
router.get("/", authenticateUser, getUsers);
router.patch("/:id/deactivate", authenticateUser, deactivateAcount);
router.patch("/:id/activate", activateAcount);
router.patch("/:id/changePassword", changePassword);

export const userRoute = router;
