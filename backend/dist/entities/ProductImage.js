"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductImage = void 0;
const typeorm_1 = require("typeorm");
const ProductDetails_1 = require("./ProductDetails");
/**For creating product image table */
let ProductImage = class ProductImage {
};
exports.ProductImage = ProductImage;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], ProductImage.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], ProductImage.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], ProductImage.prototype, "image_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ProductDetails_1.ProductDetails, (productDetails) => productDetails.images, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", ProductDetails_1.ProductDetails)
], ProductImage.prototype, "productDetails", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], ProductImage.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], ProductImage.prototype, "updatedAt", void 0);
exports.ProductImage = ProductImage = __decorate([
    (0, typeorm_1.Entity)("product_images")
], ProductImage);
