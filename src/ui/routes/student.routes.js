import express from "express";
import { StudentController } from "../controllers/student.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware("admin"), StudentController.create);
router.get("/", authMiddleware(), StudentController.getAll);
router.get("/:id", authMiddleware(), StudentController.getById);
router.put("/:id", authMiddleware(), StudentController.update);
router.delete("/:id", authMiddleware("admin"), StudentController.delete);

export default router;
