import LecturerService from "../../bll/services/lecturer.service.js";

class LecturerController {
  async getAssignedStudents(req, res, next) {
    try {
      const students = await LecturerService.getAssignedStudents(req.user.id);
      res.json({ success: true, data: students });
    } catch (err) {
      next(err);
    }
  }

  async evaluateStudent(req, res, next) {
    try {
      const lecturerId = req.user.id;
      const studentId = req.params.studentId;
      const {
        progressReportId,
        scoreProcess,
        scoreReport,
        scoreDefense,
        comments,
      } = req.body;

      const evaluation = await LecturerService.evaluateStudent({
        studentId,
        lecturerId,
        progressReportId,
        scoreProcess,
        scoreReport,
        scoreDefense,
        comments,
      });

      res.status(201).json({ success: true, data: evaluation });
    } catch (err) {
      next(err);
    }
  }

  async getEvaluations(req, res, next) {
    try {
      const lecturerId = req.user.id;
      const evaluations = await LecturerService.getEvaluationsByLecturer(
        lecturerId
      );
      res.json({ success: true, data: evaluations });
    } catch (err) {
      next(err);
    }
  }

  async getDefenseSchedules(req, res, next) {
    try {
      const lecturerId = req.user.id;
      const schedules = await LecturerService.getDefenseSchedules(lecturerId);
      res.json({ success: true, data: schedules });
    } catch (err) {
      next(err);
    }
  }

  async createOrUpdateDefenseSchedule(req, res, next) {
    try {
      const scheduleData = req.body;
      scheduleData.lecturer = req.user.id; // ensure lecturer is current user

      const schedule = await LecturerService.createOrUpdateDefenseSchedule(
        scheduleData
      );
      res
        .status(scheduleData._id ? 200 : 201)
        .json({ success: true, data: schedule });
    } catch (err) {
      next(err);
    }
  }

  async addStudentToDefense(req, res, next) {
    try {
      const { scheduleId } = req.params;
      const { studentId } = req.body;

      const updatedSchedule = await LecturerService.addStudentToDefense(
        scheduleId,
        studentId
      );
      res.json({ success: true, data: updatedSchedule });
    } catch (err) {
      next(err);
    }
  }

  async removeStudentFromDefense(req, res, next) {
    try {
      const { scheduleId, studentId } = req.params;
      const updatedSchedule = await LecturerService.removeStudentFromDefense(
        scheduleId,
        studentId
      );
      res.json({ success: true, data: updatedSchedule });
    } catch (err) {
      next(err);
    }
  }

  async finalizeDefenseSchedule(req, res, next) {
    try {
      const { scheduleId } = req.params;
      const { minutes } = req.body;

      const finalized = await LecturerService.finalizeDefense(
        scheduleId,
        minutes
      );
      res.json({ success: true, data: finalized });
    } catch (err) {
      next(err);
    }
  }
  async respondToProgress(req, res, next) {
    try {
      const { progressId } = req.params;
      const { message } = req.body;
      const lecturerId = req.user.id;

      if (!message || message.trim() === "") {
        return res
          .status(400)
          .json({ success: false, message: "Message is required" });
      }

      const updatedProgress = await LecturerService.respondToProgress(
        progressId,
        lecturerId,
        message
      );

      res.json({ success: true, data: updatedProgress });
    } catch (err) {
      next(err);
    }
  }
  async evaluateStudent(req, res, next) {
    try {
      const lecturerId = req.user.id;
      const studentId = req.params.studentId;
      const {
        progressReportId,
        scoreProcess,
        scoreReport,
        scoreDefense,
        comments,
      } = req.body;

      // Validate đơn giản ở đây, hoặc dùng Joi ở validator
      await evaluationSchema.validateAsync(req.body);

      const evaluation = await LecturerService.evaluateStudent({
        studentId,
        lecturerId,
        progressReportId,
        scoreProcess,
        scoreReport,
        scoreDefense,
        comments,
      });

      res.status(201).json({ success: true, data: evaluation });
    } catch (error) {
      next(error);
    }
  }

  async getEvaluations(req, res, next) {
    try {
      const lecturerId = req.user.id;
      const evaluations = await LecturerService.getEvaluationsByLecturer(
        lecturerId
      );
      res.json({ success: true, data: evaluations });
    } catch (error) {
      next(error);
    }
  }
}

export default new LecturerController();
