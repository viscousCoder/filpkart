"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageToCloudinary = void 0;
const cloudinary_config_1 = require("./cloudinary.config");
// Upload image to Cloudinary
const uploadImageToCloudinary = (file) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const { createReadStream, filename, mimetype } = file;
        try {
            // Upload the image to Cloudinary
            const uploadStream = cloudinary_config_1.cloudinary.v2.uploader.upload_stream({
                folder: "eccom",
                resource_type: "auto",
            }, (error, result) => {
                if (error) {
                    return reject("Error uploading to Cloudinary");
                }
                if (result === null || result === void 0 ? void 0 : result.secure_url) {
                    return resolve(result.secure_url);
                }
                return reject("No secure URL returned from Cloudinary");
            });
            // Pipe the file stream to Cloudinary
            createReadStream().pipe(uploadStream);
        }
        catch (error) {
            reject("Error uploading to Cloudinary");
        }
    });
});
exports.uploadImageToCloudinary = uploadImageToCloudinary;
