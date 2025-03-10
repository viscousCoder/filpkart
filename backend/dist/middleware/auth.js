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
exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET_KEY = process.env.MYCUSTOMSECRET_KEY;
/**
 * @function to generate the token
 * @param user or admin details
 * @returns token
 */
function generateToken(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const payload = {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            role: user.role,
            phone: user.phonenumber,
        };
        const data = jsonwebtoken_1.default.sign(payload, SECRET_KEY, { expiresIn: "20h" });
        return data;
    });
}
/**
 * @function to verify that the token is authenticated or not
 * @param token
 * @returns user/admin
 */
function verifyToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const payload = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        return payload;
    });
}
