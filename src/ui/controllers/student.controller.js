import { sendSuccess, sendError } from "../../utils/response.js";
import { StudentService } from "../../bll/services/student.service.js";
import { studentValidator } from "../../bll/validators/student.validator.js";

const studentService = new StudentService();

export class StudentController {
  static async create(req, res) {
    try {
      const { error } = studentValidator.validate(req.body);
      if (error)
        return sendError(res, {
          status: 400,
          message: error.details[0].message,
        });

      const student = await studentService.createStudent(req.body);
      return sendSuccess(res, {
        status: 201,
        message: "Student created successfully",
        data: student,
      });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  static async getAll(req, res) {
    try {
      const students = await studentService.getAllStudents();
      return sendSuccess(res, { data: students });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  static async getById(req, res) {
    try {
      const student = await studentService.getStudentById(req.params.id);
      if (!student)
        return sendError(res, { status: 404, message: "Student not found" });
      return sendSuccess(res, { data: student });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  static async update(req, res) {
    try {
      const student = await studentService.updateStudent(
        req.params.id,
        req.body
      );
      if (!student)
        return sendError(res, { status: 404, message: "Student not found" });
      return sendSuccess(res, { message: "Student updated", data: student });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  static async delete(req, res) {
    try {
      const student = await studentService.deleteStudent(req.params.id);
      if (!student)
        return sendError(res, { status: 404, message: "Student not found" });
      return sendSuccess(res, { message: "Student deleted" });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }
}
