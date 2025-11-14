import BaseRepository from "../../core/base/BaseRepository.js";
import DefenseSchedule from "../models/defenseSchedule.model.js";

class DefenseScheduleRepository extends BaseRepository {
  constructor() {
    super(DefenseSchedule);
  }

  // Lấy lịch của giảng viên
  getByLecturer(lecturerId) {
    return this.model.find({ lecturer: lecturerId }).populate("students");
  }

  // Lấy lịch của một sinh viên
  getByStudent(studentId) {
    return this.model.find({ students: studentId }).populate("lecturer");
  }

  // Thêm sinh viên vào lịch bảo vệ
  addStudent(scheduleId, studentId) {
    return this.model.findByIdAndUpdate(
      scheduleId,
      { $addToSet: { students: studentId } },
      { new: true }
    );
  }

  // Xóa sinh viên khỏi lịch bảo vệ
  removeStudent(scheduleId, studentId) {
    return this.model.findByIdAndUpdate(
      scheduleId,
      { $pull: { students: studentId } },
      { new: true }
    );
  }

  // Đánh dấu hoàn tất buổi chấm
  finalizeSchedule(scheduleId, minutes) {
    return this.model.findByIdAndUpdate(
      scheduleId,
      { finalized: true, minutes },
      { new: true }
    );
  }
}

export default new DefenseScheduleRepository();
