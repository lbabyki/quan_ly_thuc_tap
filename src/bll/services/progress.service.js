import { ProgressRepository } from "../../dal/repositories/progress.repository.js";
export class ProgressService {
  constructor() {
    this.repo = new ProgressRepository();
  }
  async create(data) {
    return this.repo.create(data);
  }
  async listByStudent(studentId) {
    return this.repo.find({ student: studentId });
  }
  async listByStudentAndWeek(studentId, week) {
    return this.repo.find({ student: studentId, week });
  }
}
