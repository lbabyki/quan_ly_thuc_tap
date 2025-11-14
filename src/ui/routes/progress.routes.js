import express from "express";
import { ProgressController } from "../controllers/progress.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { upload } from "../../utils/fileHandler.js";
const router = express.Router();

// Student routes
router.post(
  "/",
  authMiddleware(),
  upload.array("attachments", 5),
  ProgressController.create
);
router.get("/me", authMiddleware(), ProgressController.myList);
router.get(
  "/me/week/:week",
  authMiddleware(),
  ProgressController.myProgressByWeek
);

// Lecturer routes
router.get(
  "/student/:studentId",
  authMiddleware("lecturer"),
  ProgressController.listByStudent
);
router.patch(
  "/:progressId/status",
  authMiddleware("lecturer"),
  ProgressController.updateStatus
);

export default router;
