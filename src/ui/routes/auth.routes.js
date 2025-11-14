import express from "express";
import {
  register,
  login,
  getUserProfile,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", authMiddleware(false), register);
router.post("/login", login);
router.get("/me", authMiddleware(), getUserProfile);

export default router;
