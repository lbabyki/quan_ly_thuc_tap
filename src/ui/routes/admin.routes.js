import express from "express";
import { AdminController } from "../controllers/admin.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = express.Router();

// Tất cả routes đều cần admin role
router.use(authMiddleware("admin"));

// ===== QUẢN LÝ NGƯỜI DÙNG =====
router.get("/users", AdminController.getUsers);
router.post("/users", AdminController.createUser);
router.patch("/users/:id", AdminController.updateUser);
router.delete("/users/:id", AdminController.deleteUser);
router.post("/users/:id/reset-password", AdminController.resetPassword);

// ===== QUẢN LÝ ĐỀ TÀI =====
router.post("/internships", AdminController.createInternship);
router.patch("/internships/:id", AdminController.updateInternship);
router.delete("/internships/:id", AdminController.deleteInternship);
router.post("/internships/:id/approve", AdminController.approveSuggestion);

// ===== QUẢN LÝ KỲ THỰC TẬP =====
router.post("/semesters", AdminController.createSemester);
router.patch("/semesters/:id", AdminController.updateSemester);
router.post("/semesters/:id/activate", AdminController.setActiveSemester);

// ===== DASHBOARD & ANALYTICS =====
router.get("/dashboard", AdminController.getDashboard);
router.get("/analytics", AdminController.getAnalytics);

// ===== QUẢN LÝ BÁO CÁO DOANH NGHIỆP =====
router.get("/company-reports", AdminController.getCompanyReports);
router.post("/company-reports/:id/approve", AdminController.approveCompanyReport);
router.post("/company-reports/:id/reject", AdminController.rejectCompanyReport);

export default router;