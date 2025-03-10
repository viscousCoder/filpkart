import "reflect-metadata";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { ApolloServer } from "@apollo/server";
import { getConnection } from "./connection/db.config";
import { verifyToken } from "./middleware/auth";
import { Request } from "express";
import { expressMiddleware } from "@apollo/server/express4";
import { graphQLSchema } from "./schema/graphqlschema";
import { graphQLResolver } from "./resolver/graphQLResolver";
import adminRoutes from "./routes/admin";
import { authorization, isAdmin } from "./middleware/authorization";

interface user {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
  role: string;
}
// Apply the upload middleware
const PORT = 1211;

async function getStarted() {
  const app = express();
  // app.use(cors());
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "x-apollo-operation-name",
        "x-auth-token",
      ],
    })
  );

  app.use(bodyParser.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  try {
    /**
     * apollo server
     */
    const server = new ApolloServer({
      typeDefs: graphQLSchema,
      resolvers: graphQLResolver,
      csrfPrevention: false,
    });

    /**
     * starting the server
     */
    await server.start();

    /**
     * establishing connection with database
     */

    await getConnection();

    /**
     *graphql
     */
    app.use(
      "/graphql",
      expressMiddleware(server, {
        context: async ({
          req,
        }: {
          req: Request;
        }): Promise<{ user: user | null }> => {
          const token = req.headers.authorization;
          if (!token) return { user: null };

          const user = (await verifyToken(token)) as user;
          return { user };
        },
      })
    );

    app.use(authorization);
    app.use("/admin", isAdmin(["ADMIN"]), adminRoutes);

    app.listen(PORT, () => console.log(`Server is runnig at Port ${PORT}`));
  } catch (error) {
    console.log("Error while connecting to database", error);
  }
}

getStarted();
