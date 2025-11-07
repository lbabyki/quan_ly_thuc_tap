import express from "express";
import { ProgressController } from "../controllers/progress.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
const router = express.Router();
router.post("/", authMiddleware(), ProgressController.create);
router.get("/me", authMiddleware(), ProgressController.myList);
router.get(
  "/student/:studentId",
  authMiddleware("lecturer"),
  ProgressController.listByStudent
);
router.get("/:week", authMiddleware(), ProgressController.listProgressByWeek);
export default router;
