import { sendSuccess, sendError } from "../../utils/response.js";
import { InternshipService } from "../../bll/services/internship.service.js";
const internshipService = new InternshipService();
export class InternshipController {
  static async register(req, res) {
    try {
      const body = req.body;
      body.students = body.students || [];
      const rec = await internshipService.create(body);
      return sendSuccess(res, {
        status: 201,
        message: "Registered internship",
        data: rec,
      });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }
  static async my(req, res) {
    try {
      const student = req.user;
      if (!student.internshipCompany) return sendSuccess(res, { data: null });
      const rec = await internshipService.getById(student.internshipCompany);
      return sendSuccess(res, { data: rec });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }
  static async listAll(req, res) {
    try {
      const list = await internshipService.list();
      return sendSuccess(res, { data: list });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }
}
