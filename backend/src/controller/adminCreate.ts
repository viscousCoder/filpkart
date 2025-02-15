import { Request, Response } from "express";
import { cloudinary } from "../utils/cloudinary.config";
import { getConnection } from "../connection/db.config";
import { ProductDetails } from "../entities/ProductDetails";
import { ProductImage } from "../entities/ProductImage";
import { Subtitle } from "../entities/Subtitle";

/**To add the products */
export const handleCreateProducts = async (req: Request, res: Response) => {
  try {
    const {
      name,
      subtitle,
      price,
      rating,
      overview,
      company_name,
      category,
      subcategory,
      quantity,
      discount,
    } = req.body;

    if (!req.files) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const outerImageFile = files?.["outer_image"]?.[0]; // Get outer image
    const allImageFiles = files?.["all_images"]; // Get all images

    if (!outerImageFile) {
      return res.status(400).json({ message: "Outer image is required" });
    }

    /**Upload Outer Image */
    const outerImageUpload = await new Promise<cloudinary.UploadApiResponse>(
      (resolve, reject) => {
        const stream = cloudinary.v2.uploader.upload_stream(
          { folder: "Eccomerce_flipkart" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result as cloudinary.UploadApiResponse);
          }
        );
        stream.end(outerImageFile.buffer);
      }
    );

    /**Uploade all images */
    const allImageUploads = await Promise.all(
      allImageFiles.map(
        (file) =>
          new Promise<cloudinary.UploadApiResponse>((resolve, reject) => {
            const stream = cloudinary.v2.uploader.upload_stream(
              { folder: "products" },
              (error, result) => {
                if (error) return reject(error);
                resolve(result as cloudinary.UploadApiResponse);
              }
            );
            stream.end(file.buffer);
          })
      )
    );

    const AppDataSource = await getConnection();
    const productRepository = AppDataSource.getRepository(ProductDetails);
    const productImageRepository = AppDataSource.getRepository(ProductImage);
    const subtitleRepository = AppDataSource.getRepository(Subtitle);

    // Create new product
    const newProduct = new ProductDetails();
    newProduct.name = name;
    newProduct.outer_image = outerImageUpload.secure_url;
    newProduct.outer_image_id = outerImageUpload.public_id;
    newProduct.price = parseFloat(price);
    newProduct.rating = parseFloat(rating);
    newProduct.overview = String(overview);
    newProduct.company_name = company_name;
    newProduct.category = category;
    newProduct.subcategory = subcategory;
    newProduct.quantity = parseInt(quantity);
    newProduct.discount = parseFloat(discount);

    await productRepository.save(newProduct);

    // Save subtitles separately and associate them with the product
    if (subtitle) {
      const subtitleArray = JSON.parse(subtitle);
      const subtitleEntities = subtitleArray.map((text: string) => {
        const subtitleEntity = new Subtitle();
        subtitleEntity.text = text;
        subtitleEntity.product = newProduct;
        return subtitleEntity;
      });

      await subtitleRepository.save(subtitleEntities);
    }

    // Save product images
    const productImages = allImageUploads.map((upload) => {
      const imageEntity = new ProductImage();
      imageEntity.image = upload.secure_url;
      imageEntity.image_id = upload.public_id;
      imageEntity.productDetails = newProduct;
      return imageEntity;
    });

    await productImageRepository.save(productImages);

    // Fetch product again without circular references
    const savedProduct = await productRepository.findOne({
      where: { id: newProduct.id },
      relations: ["subtitles", "images"],
    });

    res.status(201).json({
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Server error" });
  }
};
