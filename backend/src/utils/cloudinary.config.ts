import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.MYCLOUDNAME,
  api_key: process.env.MYAPIKEY,
  api_secret: process.env.MYAPISECRETKEY,
});

export { cloudinary };
