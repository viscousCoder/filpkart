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
exports.authorization = authorization;
exports.isAdmin = isAdmin;
const auth_1 = require("./auth");
/**
 * @function for authorization
 */
function authorization(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.header("x-auth-token");
        if (!token) {
            return next();
        }
        try {
            const decoded = yield (0, auth_1.verifyToken)(token);
            if (decoded && typeof decoded !== "string") {
                req.user = decoded;
            }
        }
        catch (error) {
            console.error("Error verifying token:", error);
        }
        finally {
            next();
        }
    });
}
/**
 * @function for checking the user is admin or not
 * @param data
 * @returns clearance to next function
 */
function isAdmin(data) {
    return function (req, res, next) {
        if (!req.user) {
            return res.status(401).send({ message: "Unauthorized" });
        }
        if (!data.includes(req.user.role))
            return res.status(403).send({ message: "Forbidden" });
        next();
    };
}
