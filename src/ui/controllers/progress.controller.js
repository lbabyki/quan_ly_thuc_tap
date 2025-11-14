import { sendSuccess, sendError } from "../../utils/response.js";
import { ProgressService } from "../../bll/services/progress.service.js";
import { progressValidator } from "../../bll/validators/progress.validator.js";
const progressService = new ProgressService();
export class ProgressController {
  static async create(req, res) {
    try {
      const { error } = progressValidator.validate(req.body);
      if (error)
        return sendError(res, {
          status: 400,
          message: error.details[0].message,
        });

      const payload = {
        ...req.body,
        student: req.user._id,
        attachments: req.files ? req.files.map((file) => file.filename) : [],
      };

      const rec = await progressService.create(payload);
      return sendSuccess(res, {
        status: 201,
        message: "Progress added",
        data: rec,
      });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  // Lấy danh sách progress của student hiện tại
  static async myList(req, res) {
    try {
      const studentId = req.user._id;
      const progressList = await progressService.listByStudent(studentId);
      return sendSuccess(res, { data: progressList });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  // Lấy progress của student theo tuần
  static async myProgressByWeek(req, res) {
    try {
      const studentId = req.user._id;
      const { week } = req.params;
      const progress = await progressService.listByStudentAndWeek(
        studentId,
        parseInt(week)
      );
      return sendSuccess(res, { data: progress });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  // Lecturer xem progress của student cụ thể
  static async listByStudent(req, res) {
    try {
      const { studentId } = req.params;
      const progressList = await progressService.listByStudent(studentId);
      return sendSuccess(res, { data: progressList });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  // Lecturer update status
  static async updateStatus(req, res) {
    try {
      const { progressId } = req.params;
      const { status } = req.body;

      if (!["submitted", "reviewed", "approved"].includes(status)) {
        return sendError(res, { status: 400, message: "Invalid status" });
      }

      const updated = await progressService.updateStatus(progressId, status);
      return sendSuccess(res, { message: "Status updated", data: updated });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }
}
