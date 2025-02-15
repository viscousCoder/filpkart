import { Router } from "express";
import { handleCreateProducts } from "../controller/adminCreate";
import { uploadMiddleware } from "../utils/multer.config";

const router = Router();

// Handle file uploads: `outer_image` (single) and `all_images` (multiple)
router.post("/create-product", uploadMiddleware, handleCreateProducts);

export default router;
