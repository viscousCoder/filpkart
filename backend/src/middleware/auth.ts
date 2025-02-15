import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.MYCUSTOMSECRET_KEY as string;

interface user {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
  role?: string;
}

/**
 * @function to generate the token
 * @param user or admin details
 * @returns token
 */
export async function generateToken(user: user) {
  const payload = {
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    role: user.role,
    phone: user.phonenumber,
  };
  const data = jwt.sign(payload, SECRET_KEY, { expiresIn: "20h" });
  return data;
}

/**
 * @function to verify that the token is authenticated or not
 * @param token
 * @returns user/admin
 */
export async function verifyToken(token: string) {
  const payload = jwt.verify(token, SECRET_KEY);

  return payload;
}
