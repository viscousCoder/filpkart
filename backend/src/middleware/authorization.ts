import { verifyToken } from "./auth";
import { Request, Response, NextFunction } from "express";

interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  phonenumber: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

/**
 * @function for authorization
 */
export async function authorization(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.header("x-auth-token");
  if (!token) {
    return next();
  }

  try {
    const decoded = await verifyToken(token);

    if (decoded && typeof decoded !== "string") {
      req.user = decoded as User;
    }
  } catch (error) {
    console.error("Error verifying token:", error);
  } finally {
    next();
  }
}

/**
 * @function for checking the user is admin or not
 * @param data
 * @returns clearance to next function
 */
export function isAdmin(data: string | string[]) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    if (!data.includes(req.user.role))
      return res.status(403).send({ message: "Forbidden" });
    next();
  };
}
