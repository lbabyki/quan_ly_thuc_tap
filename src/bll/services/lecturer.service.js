import LecturerRepository from "../../dal/repositories/lecturer.repository.js";
import EvaluationRepository from "../../dal/repositories/evaluation.repository.js";
import DefenseScheduleRepository from "../../dal/repositories/defenseSchedule.repository.js";
import ProgressRepository from "../../dal/repositories/progress.repository.js";

class LecturerService {
  async getAssignedStudents(lecturerId) {
    const lecturer = await LecturerRepository.getAssignedStudents(lecturerId);
    if (!lecturer) throw new Error("Lecturer not found");
    return lecturer.assignedStudents;
  }

  // Đánh giá sinh viên (tạo hoặc cập nhật)
  async evaluateStudent({
    studentId,
    lecturerId,
    progressReportId = null,
    scoreProcess = null,
    scoreReport = null,
    scoreDefense = null,
    comments = "",
  }) {
    if (progressReportId) {
      let existingEval = await EvaluationRepository.getByReport(
        progressReportId
      );
      if (existingEval) {
        existingEval.scoreProcess = scoreProcess ?? existingEval.scoreProcess;
        existingEval.scoreReport = scoreReport ?? existingEval.scoreReport;
        existingEval.scoreDefense = scoreDefense ?? existingEval.scoreDefense;
        existingEval.comments = comments || existingEval.comments;
        return existingEval.save();
      }
    }
    const evaluation = await EvaluationRepository.model.create({
      student: studentId,
      lecturer: lecturerId,
      progressReport: progressReportId,
      scoreProcess,
      scoreReport,
      scoreDefense,
      comments,
    });
    return evaluation;
  }

  async getEvaluationsByLecturer(lecturerId) {
    return EvaluationRepository.getByLecturer(lecturerId);
  }

  async getDefenseSchedules(lecturerId) {
    return DefenseScheduleRepository.getByLecturer(lecturerId);
  }

  async createOrUpdateDefenseSchedule(scheduleData) {
    if (scheduleData._id) {
      return DefenseScheduleRepository.update(scheduleData._id, scheduleData);
    }
    return DefenseScheduleRepository.create(scheduleData);
  }

  async addStudentToDefense(scheduleId, studentId) {
    return DefenseScheduleRepository.addStudent(scheduleId, studentId);
  }

  async removeStudentFromDefense(scheduleId, studentId) {
    return DefenseScheduleRepository.removeStudent(scheduleId, studentId);
  }

  async finalizeDefense(scheduleId, minutes) {
    return DefenseScheduleRepository.finalizeSchedule(scheduleId, minutes);
  }

  async respondToProgress(progressId, lecturerId, message) {
    const progress = await ProgressRepository.findById(progressId);
    if (!progress) throw new Error("Progress report not found");

    const updatedProgress = await ProgressRepository.addFeedback(
      progressId,
      lecturerId,
      message
    );

    return updatedProgress;
  }
}

export default new LecturerService();
