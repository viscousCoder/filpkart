"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminCreate_1 = require("../controller/adminCreate");
const multer_config_1 = require("../utils/multer.config");
const router = (0, express_1.Router)();
// Handle file uploads: `outer_image` (single) and `all_images` (multiple)
router.post("/create-product", multer_config_1.uploadMiddleware, adminCreate_1.handleCreateProducts);
exports.default = router;
