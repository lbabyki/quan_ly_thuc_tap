import express from "express";
import auth from "../../middleware/auth.middleware.js";
import LecturerController from "../controllers/lecturer.controller.js";

const router = express.Router();

// Middleware xác thực lecturer role
router.use(auth("lecturer"));

// Lấy danh sách sinh viên được gán
router.get("/students", LecturerController.getAssignedStudents);

// Đánh giá sinh viên
router.post("/evaluate/:studentId", LecturerController.evaluateStudent);

// Lấy danh sách đánh giá do lecturer tạo
router.get("/evaluations", LecturerController.getEvaluations);

// Quản lý lịch bảo vệ
router.get("/defense-schedules", LecturerController.getDefenseSchedules);
router.post(
  "/defense-schedules",
  LecturerController.createOrUpdateDefenseSchedule
);
router.put(
  "/defense-schedules",
  LecturerController.createOrUpdateDefenseSchedule
);

// Thêm sinh viên vào lịch bảo vệ
router.post(
  "/defense-schedules/:scheduleId/students",
  LecturerController.addStudentToDefense
);

// Xóa sinh viên khỏi lịch bảo vệ
router.delete(
  "/defense-schedules/:scheduleId/students/:studentId",
  LecturerController.removeStudentFromDefense
);

// Hoàn tất lịch bảo vệ
router.post(
  "/defense-schedules/:scheduleId/finalize",
  LecturerController.finalizeDefenseSchedule
);

router.post(
  "/progress/:progressId/respond",
  LecturerController.respondToProgress
);
// Nhập điểm đánh giá cho sinh viên
router.post("/evaluate/:studentId", LecturerController.evaluateStudent);

// Lấy tất cả đánh giá do lecturer thực hiện
router.get("/evaluations", LecturerController.getEvaluations);
export default router;
