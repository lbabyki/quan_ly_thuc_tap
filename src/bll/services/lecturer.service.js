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

  // Phản hồi báo cáo tiến độ của sinh viên
  async respondToProgress(progressId, lecturerId, message) {
    // Ở đây bạn có thể lưu phản hồi vào progress report hoặc 1 collection riêng
    // Giả sử trong progress.repository có hàm addFeedback(progressId, lecturerId, message)
    // Nếu chưa có, cần implement hoặc lưu trong Evaluation nếu phù hợp

    // Placeholder: Cần implement sau với progressRepository
    throw new Error("Method respondToProgress chưa được implement");
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
}

export default new LecturerService();
