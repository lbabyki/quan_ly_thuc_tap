import { ProgressRepository } from "../../dal/repositories/progress.repository.js";
export class ProgressService {
  constructor() {
    this.repo = new ProgressRepository();
  }
  async create(data) {
    return this.repo.create(data);
  }
  async listByStudent(studentId) {
    return this.repo
      .find({ student: studentId })
      .populate("student", "name email")
      .populate("internship", "title company")
      .sort({ createdAt: -1 });
  }
  async listByStudentAndWeek(studentId, week) {
    return this.repo
      .find({ student: studentId, week })
      .populate("student", "name email")
      .populate("internship", "title company")
      .populate("feedbacks.lecturer", "name email");
  }
  async updateStatus(progressId, status) {
    return this.repo
      .findByIdAndUpdate(progressId, { status }, { new: true })
      .populate("student", "name email")
      .populate("internship", "title company");
  }
  async listByType(studentId, reportType) {
    return this.repo
      .find({ student: studentId, reportType })
      .populate("student", "name email")
      .populate("internship", "title company")
      .sort({ createdAt: -1 });
  }
  async getById(progressId) {
    return this.repo
      .findById(progressId)
      .populate("student", "name email")
      .populate("internship", "title company")
      .populate("feedbacks.lecturer", "name email");
  }
}
