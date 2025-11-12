// src/ui/routes/internship.routes.js
import express from "express";
import { InternshipController } from "../controllers/internship.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";
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
// existing admin flow for creating internships (if exists): keep POST / for admin
router.post(
  "/",
  authMiddleware("admin"),
  InternshipController.createInternship
);

export default router;
