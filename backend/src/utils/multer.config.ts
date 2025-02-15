import multer from "multer";

const storage = multer.memoryStorage(); // or configure diskStorage
const upload = multer({ storage });

const uploadMiddleware = upload.fields([
  { name: "outer_image", maxCount: 1 }, // Single file
  { name: "all_images", maxCount: 10 }, // Multiple files
]);

export { uploadMiddleware };
