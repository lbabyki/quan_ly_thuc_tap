import express from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import LecturerController from "../controllers/lecturer.controller.js";

const router = express.Router();

// Middleware xác thực lecturer role
router.use(authMiddleware("lecturer"));

// Student management
router.get("/students", LecturerController.getAssignedStudents);
router.post("/evaluate/:studentId", LecturerController.evaluateStudent);
router.get("/evaluations", LecturerController.getEvaluations);

// Defense Schedule management
router.get("/defense-schedules", LecturerController.getDefenseSchedules);
router.post("/defense-schedules", LecturerController.createDefenseSchedule);
router.post(
  "/defense-schedules/:scheduleId/students",
  LecturerController.addStudentToDefense
);
router.post(
  "/defense-schedules/:scheduleId/finalize",
  LecturerController.finalizeDefense
);

export default router;
