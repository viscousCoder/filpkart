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
exports.get_admin_db = get_admin_db;
exports.get_user_db = get_user_db;
exports.get_products_list = get_products_list;
exports.get_product_details = get_product_details;
exports.get_search_product_list = get_search_product_list;
exports.get_user_address = get_user_address;
exports.get_user_single_address = get_user_single_address;
exports.get_user_order = get_user_order;
const typeorm_1 = require("typeorm");
const db_config_1 = require("../connection/db.config");
const Address_1 = require("../entities/Address");
const AdminUser_1 = require("../entities/AdminUser");
const ProductDetails_1 = require("../entities/ProductDetails");
const User_1 = require("../entities/User");
const UserOrder_1 = require("../entities/UserOrder");
/**
 * @function get admin details
 * @param param0 email
 * @returns admin details
 */
function get_admin_db(_a) {
    return __awaiter(this, arguments, void 0, function* ({ email }) {
        const AppDataSource = yield (0, db_config_1.getConnection)();
        const userRepo = yield AppDataSource.getRepository(AdminUser_1.AdminUser);
        const user = yield userRepo.findOne({ where: { email } });
        return user;
    });
}
/**
 * @function get user details
 * @param param0 email
 * @returns user details
 */
function get_user_db(_a) {
    return __awaiter(this, arguments, void 0, function* ({ email }) {
        const AppDataSource = yield (0, db_config_1.getConnection)();
        const userRepo = yield AppDataSource.getRepository(User_1.User);
        const user = yield userRepo.findOne({ where: { email } });
        return user;
    });
}
/**
 * @function get all products
 * @param param0 category, comapnyname,or subcatgeiory
 * @returns list of products
 */
function get_products_list(_a) {
    return __awaiter(this, arguments, void 0, function* ({ company_name, category, subcategory, }) {
        try {
            const AppDataSource = yield (0, db_config_1.getConnection)();
            const productRepo = AppDataSource.getRepository(ProductDetails_1.ProductDetails);
            const whereConditions = {};
            if (company_name) {
                whereConditions.company_name = company_name;
            }
            if (category) {
                whereConditions.category = category;
            }
            if (subcategory) {
                whereConditions.subcategory = subcategory;
            }
            const products = yield productRepo.find({
                where: whereConditions,
                relations: ["images", "subtitles"],
            });
            return products;
        }
        catch (error) {
            console.error("Database error while fetching products:", error);
            throw new Error("An error occurred while retrieving products.");
        }
    });
}
/**
 * @function to get the product detail
 * @param param0 product id
 * @returns object that contain product details
 */
function get_product_details(_a) {
    return __awaiter(this, arguments, void 0, function* ({ id }) {
        try {
            const AppDataSource = yield (0, db_config_1.getConnection)();
            const productRepo = AppDataSource.getRepository(ProductDetails_1.ProductDetails);
            const product = yield productRepo.findOne({
                where: { id: id },
                relations: ["images", "subtitles"],
            });
            if (!product) {
                throw new Error("Product not found");
            }
            return product;
        }
        catch (error) {
            console.error("Error fetching product:", error);
            throw new Error("Error fetching product details");
        }
    });
}
/**
 * @function to get the user search products
 * @param param0 search query
 * @returns object that contain product details
 */
function get_search_product_list(_a) {
    return __awaiter(this, arguments, void 0, function* ({ searchQuery, }) {
        try {
            const AppDataSource = yield (0, db_config_1.getConnection)();
            const productRepo = yield AppDataSource.getRepository(ProductDetails_1.ProductDetails);
            const product = yield productRepo.find({
                where: {
                    name: (0, typeorm_1.ILike)(`%${searchQuery}%`),
                },
                relations: ["images", "subtitles"],
            });
            return product;
        }
        catch (error) {
            console.error("Error fetching product:", error);
            throw new Error("Error fetching product details");
        }
    });
}
/**
 * @function to get the user address
 * @param param0 user id
 * @returns array of list of user address
 */
function get_user_address(_a) {
    return __awaiter(this, arguments, void 0, function* ({ userId }) {
        try {
            const AppDataSource = yield (0, db_config_1.getConnection)();
            const addressRepo = AppDataSource.getRepository(Address_1.Address);
            const data = yield addressRepo.find({
                where: { user: { id: userId } },
                order: { isActiveAddress: "DESC", id: "DESC" },
            });
            console.log(data, "herer");
            return data;
        }
        catch (error) {
            throw new Error("Error in getting the user address");
        }
    });
}
/**
 * @function to get the single address
 * @param param0 userId and addressId
 * @returns return user address
 */
function get_user_single_address(_a) {
    return __awaiter(this, arguments, void 0, function* ({ userID, addressID, }) {
        try {
            const AppDataSource = yield (0, db_config_1.getConnection)();
            const addressRepo = AppDataSource.getRepository(Address_1.Address);
            const data = yield addressRepo.findOne({
                where: { id: addressID, user: { id: userID } },
            });
            if (!data) {
                throw new Error("Address not found");
            }
            return data;
        }
        catch (error) {
            throw new Error(`Error in getting the user address`);
        }
    });
}
/**
 * @function to get the user orders
 * @param param0 userId and status
 * @returns list of orders
 */
function get_user_order(_a) {
    return __awaiter(this, arguments, void 0, function* ({ userId, status, }) {
        try {
            const AppDataSource = yield (0, db_config_1.getConnection)();
            const userOrderRepo = AppDataSource.getRepository(UserOrder_1.UserOrder);
            const data = yield userOrderRepo.find({
                where: { user: { id: userId }, status },
            });
            return data;
        }
        catch (error) {
            throw new Error("Error in getting user order list");
        }
    });
}
