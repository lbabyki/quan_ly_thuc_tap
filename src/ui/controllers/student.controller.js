import { sendSuccess, sendError } from "../../utils/response.js";
import { StudentService } from "../../bll/services/student.service.js";

const studentService = new StudentService();
export class StudentController {
  static async create(req, res) {
    try {
      // create via admin or registration flow; here we expect body is ready
      const student = await studentService.createStudent(req.body);
      student.password = undefined;
      return sendSuccess(res, {
        status: 201,
        message: "Student created",
        data: student,
      });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  static async getAll(req, res) {
    try {
      const data = await studentService.getAllStudents();
      return sendSuccess(res, { data });
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

  static async update(req, res) {
    try {
      const data = await studentService.updateStudent(req.params.id, req.body);
      if (!data) return sendError(res, { status: 404, message: "Not found" });
      data.password = undefined;
      return sendSuccess(res, { message: "Updated", data });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  static async delete(req, res) {
    try {
      const data = await studentService.deleteStudent(req.params.id);
      if (!data) return sendError(res, { status: 404, message: "Not found" });
      return sendSuccess(res, { message: "Deleted" });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }
}
