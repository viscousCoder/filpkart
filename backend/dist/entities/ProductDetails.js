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
exports.ProductDetails = void 0;
const typeorm_1 = require("typeorm");
const ProductImage_1 = require("./ProductImage");
const Subtitle_1 = require("./Subtitle");
const UserOrder_1 = require("./UserOrder");
/**For creating product details table */
let ProductDetails = class ProductDetails {
};
exports.ProductDetails = ProductDetails;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], ProductDetails.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], ProductDetails.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Subtitle_1.Subtitle, (subtitle) => subtitle.product, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], ProductDetails.prototype, "subtitles", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], ProductDetails.prototype, "outer_image", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], ProductDetails.prototype, "outer_image_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ProductImage_1.ProductImage, (productImage) => productImage.productDetails, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], ProductDetails.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.Column)("float"),
    __metadata("design:type", Number)
], ProductDetails.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)("float"),
    __metadata("design:type", Number)
], ProductDetails.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { default: "No overview available" }),
    __metadata("design:type", String)
], ProductDetails.prototype, "overview", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], ProductDetails.prototype, "company_name", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], ProductDetails.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], ProductDetails.prototype, "subcategory", void 0);
__decorate([
    (0, typeorm_1.Column)("int"),
    __metadata("design:type", Number)
], ProductDetails.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)("int"),
    __metadata("design:type", Number)
], ProductDetails.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UserOrder_1.UserOrder, (order) => order.product),
    __metadata("design:type", Array)
], ProductDetails.prototype, "orders", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], ProductDetails.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], ProductDetails.prototype, "updatedAt", void 0);
exports.ProductDetails = ProductDetails = __decorate([
    (0, typeorm_1.Entity)("product_details")
], ProductDetails);
