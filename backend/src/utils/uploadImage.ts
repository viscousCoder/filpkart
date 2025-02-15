import { FileUpload } from "graphql-upload-ts";
import { cloudinary } from "./cloudinary.config";

// Upload image to Cloudinary
export const uploadImageToCloudinary = async (
  file: FileUpload
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const { createReadStream, filename, mimetype } = file;

    try {
      // Upload the image to Cloudinary
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        {
          folder: "eccom",
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            return reject("Error uploading to Cloudinary");
          }
          if (result?.secure_url) {
            return resolve(result.secure_url);
          }
          return reject("No secure URL returned from Cloudinary");
        }
      );

      // Pipe the file stream to Cloudinary
      createReadStream().pipe(uploadStream);
    } catch (error) {
      reject("Error uploading to Cloudinary");
    }
  });
};
