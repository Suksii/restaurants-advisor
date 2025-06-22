import { Router } from "express";
import { uploadImage } from "../controllers/UploadController";
import { upload } from "../middleware/Multer";
import { authenticateUser } from "../middleware/UserProfile";

const router = Router();

router.post(
  "/images",
  upload.array("images", 10),
  authenticateUser,
  uploadImage
);

export const uploadRoute = router;
