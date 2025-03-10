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
exports.insert_admin_db = insert_admin_db;
exports.insertProductDB = insertProductDB;
exports.insert_user_db = insert_user_db;
exports.insert_user_address = insert_user_address;
exports.update_user_address = update_user_address;
exports.delete_user_address = delete_user_address;
exports.insert_user_order = insert_user_order;
exports.update_user_order = update_user_order;
const typeorm_1 = require("typeorm");
const db_config_1 = require("../connection/db.config");
const Address_1 = require("../entities/Address");
const AdminUser_1 = require("../entities/AdminUser");
const ProductDetails_1 = require("../entities/ProductDetails");
const ProductImage_1 = require("../entities/ProductImage");
const User_1 = require("../entities/User");
const UserOrder_1 = require("../entities/UserOrder");
/**
 * @function for creating admin
 * @param param0 took admin details
 * @returns insterted admin user
 */
function insert_admin_db(_a) {
    return __awaiter(this, arguments, void 0, function* ({ firstname, lastname, age, phonenumber, email, hashPassword, gender, role, }) {
        const AppDataSource = yield (0, db_config_1.getConnection)();
        const adminRepo = AppDataSource.getRepository(AdminUser_1.AdminUser);
        const user = yield adminRepo.findOne({ where: { email: email } });
        if (user) {
            throw new Error("User already exists");
        }
        const userdata = yield adminRepo.save({
            firstname,
            lastname,
            age,
            phonenumber,
            email,
            password: hashPassword,
            gender,
            role,
        });
        return userdata;
    });
}
/**
 * @function to add product into the db
 * @param productData tooke product details
 * @returns created products
 */
function insertProductDB(productData) {
    return __awaiter(this, void 0, void 0, function* () {
        const AppDataSource = yield (0, db_config_1.getConnection)();
        const productRepository = AppDataSource.getRepository(ProductDetails_1.ProductDetails);
        const imageRepository = AppDataSource.getRepository(ProductImage_1.ProductImage);
        const newProduct = productRepository.create(Object.assign({}, productData));
        const savedProduct = yield productRepository.save(newProduct);
        // Save product images in DB
        const imageEntities = productData.all_images.map((image) => imageRepository.create({ image, productDetails: savedProduct }));
        yield imageRepository.save(imageEntities);
        return savedProduct;
    });
}
/**
 * @function to add user to the db
 * @param param0 took user details
 * @returns created user
 */
function insert_user_db(_a) {
    return __awaiter(this, arguments, void 0, function* ({ firstname, lastname, email, hashPassword, phonenumber, role, }) {
        const AppDataSource = yield (0, db_config_1.getConnection)();
        const userRepo = AppDataSource.getRepository(User_1.User);
        const user = yield userRepo.findOne({ where: { email: email } });
        if (user) {
            throw new Error("User already Exist");
        }
        const userData = yield userRepo.save({
            firstname,
            lastname,
            email,
            password: hashPassword,
            phonenumber,
            role,
        });
        return userData;
    });
}
/**
 * @function to add user address into the db
 * @param param0 took address details
 * @returns created address
 */
function insert_user_address(_a) {
    return __awaiter(this, arguments, void 0, function* ({ userId, name, phonenumber, pincode, locality, com_address, city, state, landmark, alternate_phonenumber, address_type, }) {
        const AppDataSource = yield (0, db_config_1.getConnection)();
        const userRepo = AppDataSource.getRepository(User_1.User);
        const addressRepo = AppDataSource.getRepository(Address_1.Address);
        try {
            const user = yield userRepo.findOne({ where: { id: userId } });
            if (!user) {
                throw new Error(`User with ID ${userId} not found`);
            }
            yield addressRepo.update({ user }, { isActiveAddress: false });
            const newAddress = addressRepo.create({
                phonenumber,
                pincode,
                name,
                locality,
                com_address,
                city,
                state,
                landmark,
                alternate_phonenumber,
                address_type,
                user,
                isActiveAddress: true,
            });
            const savedAddress = yield addressRepo.save(newAddress);
            return savedAddress;
        }
        catch (error) {
            throw new Error(`Failed to insert address for user ${userId}. Please try again.`);
        }
    });
}
/**
 * @function to update the user address into the db
 * @param param0 took address details
 * @returns return updated address
 */
function update_user_address(_a) {
    return __awaiter(this, arguments, void 0, function* ({ id, name, phonenumber, pincode, locality, com_address, city, state, landmark, alternate_phonenumber, address_type, isActiveAddress, userId, }) {
        const AppDataSource = yield (0, db_config_1.getConnection)();
        const addressRepo = AppDataSource.getRepository(Address_1.Address);
        try {
            // Check if address exists
            const existingAddress = yield addressRepo.findOne({
                where: { id: id, user: { id: userId } },
            });
            if (!existingAddress) {
                throw new Error(`Address with ID ${id} not found for user ${userId}`);
            }
            yield addressRepo.update({ user: { id: userId } }, { isActiveAddress: false });
            // Update fields only if they are provided
            const updatedAddress = yield addressRepo.save(Object.assign(Object.assign({}, existingAddress), { name: name !== null && name !== void 0 ? name : existingAddress.name, phonenumber: phonenumber !== null && phonenumber !== void 0 ? phonenumber : existingAddress.phonenumber, pincode: pincode !== null && pincode !== void 0 ? pincode : existingAddress.pincode, locality: locality !== null && locality !== void 0 ? locality : existingAddress.locality, com_address: com_address !== null && com_address !== void 0 ? com_address : existingAddress.com_address, city: city !== null && city !== void 0 ? city : existingAddress.city, state: state !== null && state !== void 0 ? state : existingAddress.state, landmark: landmark !== null && landmark !== void 0 ? landmark : existingAddress.landmark, alternate_phonenumber: alternate_phonenumber !== null && alternate_phonenumber !== void 0 ? alternate_phonenumber : existingAddress.alternate_phonenumber, address_type: address_type !== null && address_type !== void 0 ? address_type : existingAddress.address_type, isActiveAddress: true }));
            return updatedAddress;
        }
        catch (error) {
            throw new Error(`Failed to update address  Error`);
        }
    });
}
/**
 * @function to delete the user address from the db
 * @param param0 took addressId and userId
 * @returns success message
 */
function delete_user_address(_a) {
    return __awaiter(this, arguments, void 0, function* ({ addressId, userId, }) {
        const AppDataSource = yield (0, db_config_1.getConnection)();
        const addressRepo = AppDataSource.getRepository(Address_1.Address);
        try {
            // Check if address exists
            const existingAddress = yield addressRepo.findOne({
                where: { id: addressId, user: { id: userId } },
            });
            if (!existingAddress) {
                throw new Error(`Address with ID ${addressId} not found for user ${userId}`);
            }
            // Delete address
            yield addressRepo.delete({ id: addressId });
            return { message: "Address deleted successfully" };
        }
        catch (error) {
            throw new Error(`Failed to delete address `);
        }
    });
}
/**
 * @function to inseret the user order into the db
 * @param param0 took the product details and user id
 * @returns inserted product
 */
function insert_user_order(_a) {
    return __awaiter(this, arguments, void 0, function* ({ userId, productId, quantity = 1, status, }) {
        const AppDataSource = yield (0, db_config_1.getConnection)();
        const orderRepo = AppDataSource.getRepository(UserOrder_1.UserOrder);
        const userRepo = AppDataSource.getRepository(User_1.User);
        const productRepo = AppDataSource.getRepository(ProductDetails_1.ProductDetails);
        try {
            const user = yield userRepo.findOne({ where: { id: userId } });
            if (!user)
                throw new Error("User not found");
            console.log("Hoistory1", productId);
            const product = yield productRepo.findOne({ where: { id: productId } });
            if (!product)
                throw new Error("Product not found");
            if (status === "ORDERED") {
                const newOrder = orderRepo.create({ user, product, quantity, status });
                return yield orderRepo.save(newOrder);
            }
            else {
                let existingOrder = yield orderRepo.findOne({
                    where: { user: { id: userId }, product: { id: productId }, status },
                });
                if (existingOrder) {
                    existingOrder.quantity += quantity;
                    existingOrder.status = status;
                    const updatedOrder = yield orderRepo.save(existingOrder);
                    return updatedOrder;
                }
                else {
                    const newOrder = orderRepo.create({ user, product, quantity, status });
                    const savedOrder = yield orderRepo.save(newOrder);
                    return savedOrder;
                }
            }
        }
        catch (error) {
            console.error("Error in insert_user_order:", error);
            throw new Error("Something went wrong");
        }
    });
}
/**
 * @function to update the user order status into the db
 * @param param0 took the orderId, userId,quantity etc
 * @returns updated user products
 */
function update_user_order(_a) {
    return __awaiter(this, arguments, void 0, function* ({ orderId, orderIds, quantity, increase, isDelete, status, }) {
        try {
            const AppDataSource = yield (0, db_config_1.getConnection)();
            const orderRepo = AppDataSource.getRepository(UserOrder_1.UserOrder);
            // Bulk Status Update
            if (orderIds && status) {
                // const orders = await orderRepo.findByIds(orderIds);
                const orders = yield orderRepo.find({
                    where: { id: (0, typeorm_1.In)(orderIds) },
                    relations: ["product"],
                });
                if (orders.length === 0)
                    throw new Error("No matching orders found");
                const updatedOrders = orders.map((order) => {
                    order.status = status;
                    order.updatedAt = new Date();
                    return order;
                });
                console.log(updatedOrders, "hereee");
                return yield orderRepo.save(updatedOrders);
            }
            // Single Order Update (Quantity Change or Delete)
            if (orderId) {
                const order = yield orderRepo.findOne({ where: { id: orderId } });
                if (!order)
                    throw new Error("Order not found");
                if (isDelete) {
                    yield orderRepo.remove(order);
                    return [];
                }
                if (quantity !== undefined) {
                    if (increase) {
                        order.quantity += quantity;
                    }
                    else {
                        order.quantity = Math.max(1, order.quantity - quantity);
                    }
                }
                const updatedOrder = yield orderRepo.save(order);
                return [updatedOrder];
            }
            throw new Error("Invalid request: Provide either orderId or orderIds");
        }
        catch (error) {
            throw new Error("Something went wrong while updating orders");
        }
    });
}
