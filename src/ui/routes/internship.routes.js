import express from "express";
import { InternshipController } from "../controllers/internship.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";
const router = express.Router();
router.post(
  "/register",
  authMiddleware("admin"),
  InternshipController.register
);
router.get("/me", authMiddleware(), InternshipController.my);
router.get("/all", authMiddleware("admin"), InternshipController.listAll);
export default router;
