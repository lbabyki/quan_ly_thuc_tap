import jwt from "jsonwebtoken";
import errorHandler from "./error.middleware.js";
import dotenv from "dotenv";
import AppError from "../utils/appError.js";

dotenv.config();

export const authMiddleware = (required = true) => {
  return (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) {
      if (required) return next(new AppError("No token provided", 401));
      return next();
    }

    const token = header.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      next(new AppError("Invalid token", 401));
    }
  };
};
