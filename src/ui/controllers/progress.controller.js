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
      const payload = { ...req.body, student: req.user._id };
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

  static async myList(req, res) {
    try {
      const list = await progressService.listByStudent(req.user._id);
      return sendSuccess(res, { data: list });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  static async listByStudent(req, res) {
    try {
      const list = await progressService.listByStudent(req.params.studentId);
      return sendSuccess(res, { data: list });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }
}
