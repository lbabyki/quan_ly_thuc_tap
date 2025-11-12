// src/ui/routes/internship.routes.js
import express from "express";
import { InternshipController } from "../controllers/internship.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { upload } from "../../utils/fileHandler.js";

const router = express.Router();

// Public (authenticated) - students
router.get("/available", authMiddleware(), InternshipController.listAvailable);
router.post(
  "/register/:id",
  authMiddleware(),
  upload.single("document"),
  InternshipController.register
);
router.post(
  "/suggest-topic",
  authMiddleware(),
  InternshipController.suggestTopic
);
router.get("/me", authMiddleware(), InternshipController.my);

// Admin-only
router.get("/all", authMiddleware("admin"), InternshipController.listAll);

// Danh sách đề xuất
router.get(
  "/suggestions",
  authMiddleware("admin"),
  InternshipController.listSuggestions
);

// Duyệt đề xuất
router.patch(
  "/suggestions/:id",
  authMiddleware("admin"),
  InternshipController.reviewSuggestion
);
// Hủy đăng ký (student)
router.delete(
  "/cancel",
  authMiddleware(),
  InternshipController.cancelRegistration
);

export default router;
