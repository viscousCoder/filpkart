import { DataSource } from "typeorm";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

/**Environmanet Variables */
const MYDBTYPE = (process.env.MYDBTYPE as "postgres") || "postgres";
const MYHOST = process.env.MYHOST as string;
const MYDBPORT = process.env.MYDBPORT ? parseInt(process.env.MYDBPORT) : 5432;
const MYDBPASSWORD = process.env.MYDBPASSWORD;
const MYDBNAME = process.env.MYDBNAME;
const MYDBUSER = process.env.MYDBUSER;

/**
 * @function to establish the db conection
 * @returns db response
 */
export async function getConnection() {
  const AppDataSource = new DataSource({
    type: MYDBTYPE,
    host: MYHOST,
    port: MYDBPORT,
    password: MYDBPASSWORD,
    database: MYDBNAME,
    username: MYDBUSER,
    // entities: ["src/entities/**/*{.ts,.js}"],
    entities: [path.join(__dirname, "/../entities/**/*.ts")],
    synchronize: true,
    logging: true,
  });
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
}
