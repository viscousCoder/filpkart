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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphQLResolver = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const inserting_data_1 = require("../addingData/inserting_data");
const get_user_1 = require("../getData/get_user");
const auth_1 = require("../middleware/auth");
const mail_1 = __importDefault(require("@sendgrid/mail"));
// const sgMail = require('@sendgrid/mail');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
exports.graphQLResolver = {
    // Upload: GraphQLUpload,
    Query: {
        /**
         * @function to logged in admin
         * @param _
         * @param param1 email and password
         * @returns token and admin details
         */
        loginAdmin: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { email, password }) {
            const user = (yield (0, get_user_1.get_admin_db)({ email }));
            if (!user)
                throw new Error("User not found");
            const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
            if (!isPasswordValid)
                throw new Error("Invalid password");
            const token = yield (0, auth_1.generateToken)(user);
            return { message: "Successfully login", user: user, token };
        }),
        /**
         * @function to logged in admin
         * @param _
         * @param param1 email and password
         * @returns token and user details
         */
        loginUser: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { email, password }) {
            var _b;
            const user = (yield (0, get_user_1.get_user_db)({ email }));
            if (!user)
                throw new Error("User not found");
            const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
            if (!isPasswordValid)
                throw new Error("Invalid password");
            user.role = (_b = user.role) !== null && _b !== void 0 ? _b : "USER";
            const token = yield (0, auth_1.generateToken)(user);
            return { message: "Successfully Login", user, token };
        }),
        /**
         * @function get product according to company name, catgeory , subcategory
         * @param _
         * @param param1 company name, category, subcategory
         * @returns list of products
         */
        getProducts: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { company_name, category, subcategory, }) {
            try {
                const data = yield (0, get_user_1.get_products_list)({
                    company_name,
                    category,
                    subcategory,
                });
                return data;
            }
            catch (error) {
                console.error("Error fetching products:", error);
                throw new Error("Failed to fetch products. Please try again later.");
            }
        }),
        /**
         * @function get product according to query
         * @param _
         * @param param1 query
         * @returns list of products
         */
        getSearchProducts: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { searchQuery }) {
            try {
                const data = yield (0, get_user_1.get_search_product_list)({ searchQuery });
                return data;
            }
            catch (error) {
                throw new Error("Failed to fetch");
            }
        }),
        /**
         * @function get product datials according to the product id
         * @param _
         * @param param1 product id
         * @returns product details
         */
        getProductById: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
            try {
                const data = yield (0, get_user_1.get_product_details)({ id });
                if (!data) {
                    throw new Error("No products found for the given criteria.");
                }
                return data;
            }
            catch (error) {
                console.error("Error fetching products:", error);
                throw new Error("Failed to fetch products. Please try again later.");
            }
        }),
        /**
         * @function get user address
         * @param _
         * @param param1 user id
         * @returns list of address
         */
        getUserAddresses: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { userId }) {
            try {
                const data = yield (0, get_user_1.get_user_address)({ userId });
                return data;
            }
            catch (error) {
                throw new Error("Error to get the address");
            }
        }),
        /**
         * @function get single address
         * @param _
         * @param param1 userId, addressId
         * @returns address
         */
        getAddressByID: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { userID, addressID }) {
            try {
                const data = yield (0, get_user_1.get_user_single_address)({ userID, addressID });
                return data;
            }
            catch (error) {
                throw new Error("Error in getting user single address ");
            }
        }),
        /**
         * @function  get order according to status
         * @param _
         * @param param1 userId and status
         * @returns list of ordere products
         */
        getUserOrders: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { userId, status }) {
            try {
                const data = yield (0, get_user_1.get_user_order)({ userId, status });
                return data;
            }
            catch (error) {
                throw new Error("Error in getting user order list");
            }
        }),
        /**
         * @function get current user details
         * @param _
         * @param _dir
         * @param user
         * @returns user details
         */
        getUser: (_1, _dir_1, _a) => __awaiter(void 0, [_1, _dir_1, _a], void 0, function* (_, _dir, { user }) {
            if (!user) {
                throw new Error("UnAuthorised to used this");
            }
            const email = user.email;
            const userData = (yield (0, get_user_1.get_user_db)({ email }));
            const token = yield (0, auth_1.generateToken)(userData);
            return { message: "Successfully Login", userData, token };
        }),
    },
    Mutation: {
        /**
         * @function to create user as admin
         * @param _
         * @param param1 user details
         * @returns success message
         */
        createAdmin: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { firstname, lastname, phonenumber, email, password, role }) {
            try {
                const hashPassword = yield bcryptjs_1.default.hash(password, 10);
                const data = yield (0, inserting_data_1.insert_user_db)({
                    firstname,
                    lastname,
                    email,
                    hashPassword,
                    phonenumber,
                    role: role || "USER",
                });
                return { message: "User created Successfully", data };
            }
            catch (error) {
                return error;
            }
        }),
        /**
         * @function to create user
         * @param _
         * @param param1 user details
         * @returns success message
         */
        createUser: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { firstname, lastname, email, password, phonenumber, role }) {
            try {
                const hashPassword = yield bcryptjs_1.default.hash(password, 10);
                const data = yield (0, inserting_data_1.insert_user_db)({
                    firstname,
                    lastname,
                    email,
                    hashPassword,
                    phonenumber,
                    role: role || "USER",
                });
                return { message: "User created Successfully", data };
            }
            catch (error) {
                return error;
            }
        }),
        //add address
        /**
         * @function add user address to db
         * @param _
         * @param param1 address details
         * @returns created address
         */
        addAddress: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { userId, name, phonenumber, pincode, locality, com_address, city, state, landmark, alternate_phonenumber, address_type, }) {
            try {
                const data = yield (0, inserting_data_1.insert_user_address)({
                    userId,
                    name,
                    phonenumber,
                    pincode,
                    locality,
                    com_address,
                    city,
                    state,
                    landmark,
                    alternate_phonenumber,
                    address_type,
                });
                return Object.assign(Object.assign({}, data), { isActiveAddress: data.isActiveAddress });
            }
            catch (error) {
                throw new Error(`Failed to add address for user ${userId}. Please try again.`);
            }
        }),
        /**
         * @function update user address
         * @param _
         * @param param1 addressId and userId and address data
         * @returns updated address
         */
        updateAddress: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id, userId, name, phonenumber, pincode, locality, com_address, city, state, landmark, alternate_phonenumber, address_type, isActiveAddress, }) {
            try {
                const data = yield (0, inserting_data_1.update_user_address)({
                    id,
                    userId,
                    name,
                    phonenumber,
                    pincode,
                    locality,
                    com_address,
                    city,
                    state,
                    landmark,
                    alternate_phonenumber,
                    address_type,
                    isActiveAddress,
                });
                return Object.assign(Object.assign({}, data), { isActiveAddress: data.isActiveAddress });
            }
            catch (error) {
                throw new Error("Failed to update address. Please try again.");
            }
        }),
        /**
         * @function to delete the address
         * @param _
         * @param param1 userId and addressId
         * @returns success message
         */
        deleteAddress: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { addressId, userId, }) {
            try {
                console.log("Id here it is", addressId, userId);
                yield (0, inserting_data_1.delete_user_address)({
                    addressId,
                    userId,
                });
                return "Address deleted successfully";
            }
            catch (error) {
                throw new Error(`Failed to delete address for user ${userId}. Please try again.`);
            }
        }),
        /**
         * @function add order
         * @param _
         * @param param1 userId, productId and quantity
         * @returns added order
         */
        addOrder: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { userId, productId, quantity = 1, status, }) {
            try {
                const data = yield (0, inserting_data_1.insert_user_order)({
                    userId,
                    productId,
                    quantity: 1,
                    status,
                });
                return data;
            }
            catch (error) {
                throw new Error("Something went wrong");
            }
        }),
        /**
         * @function update order
         * @param _
         * @param param1 userId,status and orderId
         * @returns uodated order
         */
        updateOrder: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { orderId, orderIds, quantity, increase, delete: isDelete, status, }) {
            try {
                const data = yield (0, inserting_data_1.update_user_order)({
                    orderId,
                    orderIds,
                    quantity,
                    increase,
                    isDelete,
                    status,
                });
                return data;
            }
            catch (error) {
                throw new Error("Failed to update order. Please try again.");
            }
        }),
        /**
         * @function send email
         */
        sendMessage: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { name, email, message }) {
            const msg = {
                to: "celistialsys@gmail.com", // Admin's email
                from: "amanbisht1010@gmail.com",
                subject: "New Message from Contact Form",
                text: `You have a new message from ${name} (${email}):\n\n${message}`,
                html: `<strong>You have a new message from ${name} (${email}):</strong><br><p>${message}</p>`,
            };
            try {
                // Send email via SendGrid
                console.log(msg);
                yield mail_1.default.send(msg);
                return "Message sent successfully!";
            }
            catch (error) {
                console.error("Error sending email:", error);
                return "Failed to send message.";
            }
        }),
    },
};
