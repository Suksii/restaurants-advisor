import { Router } from "express";
import { uploadImage } from "../controllers/UploadController";
import { upload } from "../middleware/Multer";

const router = Router();

router.post("/images", upload.array("images", 10), uploadImage);

export const uploadRoute = router;
