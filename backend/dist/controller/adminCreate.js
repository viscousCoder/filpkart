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
exports.handleCreateProducts = void 0;
const cloudinary_config_1 = require("../utils/cloudinary.config");
const db_config_1 = require("../connection/db.config");
const ProductDetails_1 = require("../entities/ProductDetails");
const ProductImage_1 = require("../entities/ProductImage");
const Subtitle_1 = require("../entities/Subtitle");
/**To add the products */
const handleCreateProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name, subtitle, price, rating, overview, company_name, category, subcategory, quantity, discount, } = req.body;
        if (!req.files) {
            return res.status(400).json({ message: "No files uploaded" });
        }
        const files = req.files;
        const outerImageFile = (_a = files === null || files === void 0 ? void 0 : files["outer_image"]) === null || _a === void 0 ? void 0 : _a[0]; // Get outer image
        const allImageFiles = files === null || files === void 0 ? void 0 : files["all_images"]; // Get all images
        if (!outerImageFile) {
            return res.status(400).json({ message: "Outer image is required" });
        }
        /**Upload Outer Image */
        const outerImageUpload = yield new Promise((resolve, reject) => {
            const stream = cloudinary_config_1.cloudinary.v2.uploader.upload_stream({ folder: "Eccomerce_flipkart" }, (error, result) => {
                if (error)
                    return reject(error);
                resolve(result);
            });
            stream.end(outerImageFile.buffer);
        });
        /**Uploade all images */
        const allImageUploads = yield Promise.all(allImageFiles.map((file) => new Promise((resolve, reject) => {
            const stream = cloudinary_config_1.cloudinary.v2.uploader.upload_stream({ folder: "products" }, (error, result) => {
                if (error)
                    return reject(error);
                resolve(result);
            });
            stream.end(file.buffer);
        })));
        const AppDataSource = yield (0, db_config_1.getConnection)();
        const productRepository = AppDataSource.getRepository(ProductDetails_1.ProductDetails);
        const productImageRepository = AppDataSource.getRepository(ProductImage_1.ProductImage);
        const subtitleRepository = AppDataSource.getRepository(Subtitle_1.Subtitle);
        // Create new product
        const newProduct = new ProductDetails_1.ProductDetails();
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
        yield productRepository.save(newProduct);
        // Save subtitles separately and associate them with the product
        if (subtitle) {
            const subtitleArray = JSON.parse(subtitle);
            const subtitleEntities = subtitleArray.map((text) => {
                const subtitleEntity = new Subtitle_1.Subtitle();
                subtitleEntity.text = text;
                subtitleEntity.product = newProduct;
                return subtitleEntity;
            });
            yield subtitleRepository.save(subtitleEntities);
        }
        // Save product images
        const productImages = allImageUploads.map((upload) => {
            const imageEntity = new ProductImage_1.ProductImage();
            imageEntity.image = upload.secure_url;
            imageEntity.image_id = upload.public_id;
            imageEntity.productDetails = newProduct;
            return imageEntity;
        });
        yield productImageRepository.save(productImages);
        // Fetch product again without circular references
        const savedProduct = yield productRepository.findOne({
            where: { id: newProduct.id },
            relations: ["subtitles", "images"],
        });
        res.status(201).json({
            message: "Product created successfully",
            product: savedProduct,
        });
    }
    catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.handleCreateProducts = handleCreateProducts;
