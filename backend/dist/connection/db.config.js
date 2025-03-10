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
exports.getConnection = getConnection;
const typeorm_1 = require("typeorm");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/**Environmanet Variables */
const MYDBTYPE = process.env.MYDBTYPE || "postgres";
const MYHOST = process.env.MYHOST;
const MYDBPORT = process.env.MYDBPORT ? parseInt(process.env.MYDBPORT) : 5432;
const MYDBPASSWORD = process.env.MYDBPASSWORD;
const MYDBNAME = process.env.MYDBNAME;
const MYDBUSER = process.env.MYDBUSER;
/**
 * @function to establish the db conection
 * @returns db response
 */
// export async function getConnection() {
//   const AppDataSource = new DataSource({
//     type: MYDBTYPE,
//     host: MYHOST,
//     port: MYDBPORT,
//     password: MYDBPASSWORD,
//     database: MYDBNAME,
//     username: MYDBUSER,
//     // entities: ["src/entities/**/*{.ts,.js}"],
//     entities: [path.join(__dirname, "/../entities/**/*.ts")],
//     synchronize: true,
//     logging: true,
//   });
//   if (!AppDataSource.isInitialized) {
//     await AppDataSource.initialize();
//   }
//   return AppDataSource;
// }
/**new setup */
const PGHOST = process.env.PGHOST;
const PGDATABASE = process.env.PGDATABASE;
const PGUSER = process.env.PGUSER;
const PGPASSWORD = process.env.PGPASSWORD;
function getConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        const AppDataSource = new typeorm_1.DataSource({
            type: MYDBTYPE,
            host: PGHOST,
            port: MYDBPORT,
            password: PGPASSWORD,
            database: PGDATABASE,
            username: PGUSER,
            ssl: {
                rejectUnauthorized: false, // Allow self-signed certificates
            },
            // entities: ["src/entities/**/*{.ts,.js}"],
            entities: [path_1.default.join(__dirname, "/../entities/**/*{.ts,.js}")],
            synchronize: true,
            logging: true,
        });
        if (!AppDataSource.isInitialized) {
            yield AppDataSource.initialize();
        }
        return AppDataSource;
    });
}
