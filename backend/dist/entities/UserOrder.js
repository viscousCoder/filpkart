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
exports.UserOrder = exports.OrderStatus = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const ProductDetails_1 = require("./ProductDetails");
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["CART"] = "CART";
    OrderStatus["ORDERED"] = "ORDERED";
    OrderStatus["WISHLIST"] = "WISHLIST";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
/**For creating user order table */
let UserOrder = class UserOrder {
};
exports.UserOrder = UserOrder;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], UserOrder.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.orders, {
        eager: true,
        onDelete: "CASCADE",
    }),
    __metadata("design:type", User_1.User)
], UserOrder.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ProductDetails_1.ProductDetails, (product) => product.orders, {
        eager: true,
        onDelete: "CASCADE",
    }),
    __metadata("design:type", ProductDetails_1.ProductDetails)
], UserOrder.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 1 }),
    __metadata("design:type", Number)
], UserOrder.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: OrderStatus, default: OrderStatus.CART }),
    __metadata("design:type", String)
], UserOrder.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], UserOrder.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], UserOrder.prototype, "updatedAt", void 0);
exports.UserOrder = UserOrder = __decorate([
    (0, typeorm_1.Entity)("user_orders")
], UserOrder);
