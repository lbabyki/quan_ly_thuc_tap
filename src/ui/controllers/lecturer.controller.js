import { sendSuccess, sendError } from "../../utils/response.js";
import lecturerService from "../../bll/services/lecturer.service.js";
import {
  defenseScheduleSchema,
  addStudentToDefenseSchema,
  finalizeDefenseSchema,
} from "../../bll/validators/lecturer.validator.js";

class LecturerController {
  async getAssignedStudents(req, res) {
    try {
      const lecturerId = req.user.id;
      const students = await lecturerService.getAssignedStudents(lecturerId);
      return sendSuccess(res, { data: students });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  async evaluateStudent(req, res) {
    try {
      const { studentId } = req.params;
      const lecturerId = req.user.id;
      const evaluation = await lecturerService.evaluateStudent(
        lecturerId,
        studentId,
        req.body
      );
      return sendSuccess(res, {
        message: "Student evaluated",
        data: evaluation,
      });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  async getEvaluations(req, res) {
    try {
      const lecturerId = req.user.id;
      const evaluations = await lecturerService.getEvaluations(lecturerId);
      return sendSuccess(res, { data: evaluations });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  // NEW: Defense Schedule methods
  async getDefenseSchedules(req, res) {
    try {
      const lecturerId = req.user.id;
      const schedules = await lecturerService.getDefenseSchedules(lecturerId);
      return sendSuccess(res, { data: schedules });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  async createDefenseSchedule(req, res) {
    try {
      const { error } = defenseScheduleSchema.validate(req.body);
      if (error)
        return sendError(res, {
          status: 400,
          message: error.details[0].message,
        });

      const lecturerId = req.user.id;
      const schedule = await lecturerService.createDefenseSchedule(
        lecturerId,
        req.body
      );
      return sendSuccess(res, {
        status: 201,
        message: "Defense schedule created",
        data: schedule,
      });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  async addStudentToDefense(req, res) {
    try {
      const { scheduleId } = req.params;
      const { studentId } = req.body;

      const result = await lecturerService.addStudentToDefense(
        scheduleId,
        studentId
      );
      return sendSuccess(res, {
        message: "Student added to defense",
        data: result,
      });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  async finalizeDefense(req, res) {
    try {
      const { scheduleId } = req.params;
      const { minutes } = req.body;

      const result = await lecturerService.finalizeDefense(scheduleId, minutes);
      return sendSuccess(res, { message: "Defense finalized", data: result });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }
}

export default new LecturerController();
