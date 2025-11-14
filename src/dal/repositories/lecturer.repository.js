// src/dal/repositories/lecturer.repository.js
import BaseRepository from "../../core/base/BaseRepository.js";
import Lecturer from "../models/lecturer.model.js";

class LecturerRepository extends BaseRepository {
  constructor() {
    super(Lecturer);
  }

  // Lấy danh sách sinh viên giảng viên phụ trách
  getAssignedStudents(lecturerId) {
    return this.model.findById(lecturerId).populate("assignedStudents");
  }

  // Gán sinh viên cho giảng viên
  assignStudent(lecturerId, studentId) {
    return this.model.findByIdAndUpdate(
      lecturerId,
      { $addToSet: { assignedStudents: studentId } },
      { new: true }
    );
  }

  // Bỏ gán sinh viên
  removeAssignedStudent(lecturerId, studentId) {
    return this.model.findByIdAndUpdate(
      lecturerId,
      { $pull: { assignedStudents: studentId } },
      { new: true }
    );
  }
}

export default new LecturerRepository();
