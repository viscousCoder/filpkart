"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinary = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
exports.cloudinary = cloudinary_1.default;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Configure Cloudinary
cloudinary_1.default.v2.config({
    cloud_name: process.env.MYCLOUDNAME,
    api_key: process.env.MYAPIKEY,
    api_secret: process.env.MYAPISECRETKEY,
});
