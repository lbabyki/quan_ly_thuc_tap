import { sendSuccess, sendError } from "../../utils/response.js";
import { StudentService } from "../../bll/services/student.service.js";
import { profileValidator } from "../../bll/validators/student.validator.js";
const studentService = new StudentService();
export class StudentController {
  static async me(req, res) {
    try {
      const user = await studentService.getStudentById(req.user._id);
      if (!user) return sendError(res, { status: 404, message: "Not found" });
      user.password = undefined;
      return sendSuccess(res, { data: user });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }
  // start Khu vực updateme

  //end khu vực update me
  static async uploadCv(req, res) {
    try {
      if (!req.file)
        return sendError(res, { status: 400, message: "File required" });
      const url = `${req.protocol}://${req.get("host")}/${req.file.path}`;
      const updated = await studentService.updateStudent(req.user._id, {
        cvUrl: url,
      });
      updated.password = undefined;
      return sendSuccess(res, { message: "CV uploaded", data: updated });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  static async getById(req, res) {
    try {
      const data = await studentService.getStudentById(req.params.id);
      if (!data) return sendError(res, { status: 404, message: "Not found" });
      data.password = undefined;
      return sendSuccess(res, { data });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }
}
