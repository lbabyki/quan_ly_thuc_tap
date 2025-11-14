import LecturerRepository from "../../dal/repositories/lecturer.repository.js";
import EvaluationRepository from "../../dal/repositories/evaluation.repository.js";
import DefenseScheduleRepository from "../../dal/repositories/defenseSchedule.repository.js";

class LecturerService {
  // Lấy danh sách sinh viên được gán cho lecturer
  async getAssignedStudents(lecturerId) {
    const lecturer = await LecturerRepository.getAssignedStudents(lecturerId);
    if (!lecturer) throw new Error("Lecturer not found");
    return lecturer.assignedStudents;
  }

  // Đánh giá sinh viên (cho report hoặc tổng thể)
  async evaluateStudent({
    studentId,
    lecturerId,
    progressReportId,
    scoreProcess,
    scoreReport,
    scoreDefense,
    comments,
  }) {
    const evaluation = await EvaluationRepository.model.create({
      student: studentId,
      lecturer: lecturerId,
      progressReport: progressReportId || null,
      scoreProcess,
      scoreReport,
      scoreDefense,
      comments,
    });
    return evaluation;
  }

  // Lấy đánh giá của sinh viên do lecturer thực hiện
  async getEvaluationsByLecturer(lecturerId) {
    return EvaluationRepository.getByLecturer(lecturerId);
  }

  // Quản lý lịch bảo vệ - lấy lịch bảo vệ của lecturer
  async getDefenseSchedules(lecturerId) {
    return DefenseScheduleRepository.getByLecturer(lecturerId);
  }

  // Tạo hoặc cập nhật lịch bảo vệ
  async createOrUpdateDefenseSchedule(scheduleData) {
    // scheduleData = { lecturer, date, location, notes }
    // Nếu có id => update, không thì tạo mới
    if (scheduleData._id) {
      return DefenseScheduleRepository.update(scheduleData._id, scheduleData);
    }
    return DefenseScheduleRepository.create(scheduleData);
  }

  // Thêm sinh viên vào lịch bảo vệ
  async addStudentToDefense(scheduleId, studentId) {
    return DefenseScheduleRepository.addStudent(scheduleId, studentId);
  }

  // Xóa sinh viên khỏi lịch bảo vệ
  async removeStudentFromDefense(scheduleId, studentId) {
    return DefenseScheduleRepository.removeStudent(scheduleId, studentId);
  }

  // Finalize lịch bảo vệ (gửi biên bản chấm)
  async finalizeDefense(scheduleId, minutes) {
    return DefenseScheduleRepository.finalizeSchedule(scheduleId, minutes);
  }

  async respondToProgress(progressId, lecturerId, message) {
    // Kiểm tra progress tồn tại
    const progress = await ProgressRepository.findById(progressId);
    if (!progress) throw new Error("Progress report not found");

    // Thêm phản hồi
    const updatedProgress = await ProgressRepository.addFeedback(
      progressId,
      lecturerId,
      message
    );

    return updatedProgress;
  }
  async evaluateStudent({
    studentId,
    lecturerId,
    progressReportId = null,
    scoreProcess = null,
    scoreReport = null,
    scoreDefense = null,
    comments = "",
  }) {
    // Kiểm tra xem đã có đánh giá nào cho report này chưa (nếu progressReportId có)
    if (progressReportId) {
      let existingEval = await EvaluationRepository.getByReport(
        progressReportId
      );
      if (existingEval) {
        // Cập nhật điểm đánh giá
        existingEval.scoreProcess = scoreProcess ?? existingEval.scoreProcess;
        existingEval.scoreReport = scoreReport ?? existingEval.scoreReport;
        existingEval.scoreDefense = scoreDefense ?? existingEval.scoreDefense;
        existingEval.comments = comments || existingEval.comments;
        return existingEval.save();
      }
    }
    // Nếu chưa có đánh giá cho report đó hoặc không có report, tạo mới
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
}

export default new LecturerService();
