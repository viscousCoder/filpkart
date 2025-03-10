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
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const server_1 = require("@apollo/server");
const db_config_1 = require("./connection/db.config");
const auth_1 = require("./middleware/auth");
const express4_1 = require("@apollo/server/express4");
const graphqlschema_1 = require("./schema/graphqlschema");
const graphQLResolver_1 = require("./resolver/graphQLResolver");
const admin_1 = __importDefault(require("./routes/admin"));
const authorization_1 = require("./middleware/authorization");
// Apply the upload middleware
const PORT = 1211;
function getStarted() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        // app.use(cors());
        app.use((0, cors_1.default)({
            origin: "http://localhost:5173",
            credentials: true,
            methods: ["GET", "POST", "PUT", "DELETE"],
            allowedHeaders: [
                "Content-Type",
                "Authorization",
                "x-apollo-operation-name",
                "x-auth-token",
            ],
        }));
        app.use(body_parser_1.default.json());
        app.use(express_1.default.urlencoded({ extended: true }));
        app.use(express_1.default.json());
        try {
            /**
             * apollo server
             */
            const server = new server_1.ApolloServer({
                typeDefs: graphqlschema_1.graphQLSchema,
                resolvers: graphQLResolver_1.graphQLResolver,
                csrfPrevention: false,
            });
            /**
             * starting the server
             */
            yield server.start();
            /**
             * establishing connection with database
             */
            yield (0, db_config_1.getConnection)();
            /**
             *graphql
             */
            app.use("/graphql", (0, express4_1.expressMiddleware)(server, {
                context: (_a) => __awaiter(this, [_a], void 0, function* ({ req, }) {
                    const token = req.headers.authorization;
                    if (!token)
                        return { user: null };
                    const user = (yield (0, auth_1.verifyToken)(token));
                    return { user };
                }),
            }));
            app.use(authorization_1.authorization);
            app.use("/admin", (0, authorization_1.isAdmin)(["ADMIN"]), admin_1.default);
            app.listen(PORT, () => console.log(`Server is runnig at Port ${PORT}`));
        }
        catch (error) {
            console.log("Error while connecting to database", error);
        }
    });
}
getStarted();
