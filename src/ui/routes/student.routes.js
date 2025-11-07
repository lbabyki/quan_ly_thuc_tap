import express from "express";
import { StudentController } from "../controllers/student.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";
import { upload } from "../../utils/fileHandler.js";

const router = express.Router();
router.get("/me", authMiddleware(), StudentController.me);
router.put("/me", authMiddleware(), StudentController.updateMe);
router.post(
  "/upload-cv",
  authMiddleware(),
  upload.single("cv"),
  StudentController.uploadCv
);
router.get("/:id", authMiddleware(), StudentController.getById);
export default router;
