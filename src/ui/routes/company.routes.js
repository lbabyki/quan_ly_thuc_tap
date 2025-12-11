import express from "express";
import { CompanyController } from "../controllers/company.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = express.Router();

// Company authentication
router.post("/register", CompanyController.register);
router.post("/login", CompanyController.login);

// Company profile
router.get("/me", authMiddleware("company"), CompanyController.getProfile);
router.patch("/me", authMiddleware("company"), CompanyController.updateProfile);

// Student management
router.get("/students", authMiddleware("company"), CompanyController.getStudents);
router.post("/students/:id/confirm", authMiddleware("company"), CompanyController.confirmStudent);

// Evaluation
router.post("/students/:id/evaluate", authMiddleware("company"), CompanyController.evaluateStudent);

// Company report (NEW FEATURE)
router.post("/reports", authMiddleware("company"), CompanyController.createReport);
router.get("/reports", authMiddleware("company"), CompanyController.getMyReports);

export default router;