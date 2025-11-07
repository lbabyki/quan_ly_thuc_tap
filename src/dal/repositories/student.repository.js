import { BaseRepository } from "../../core/base/BaseRepository.js";
import Student from "../models/student.model.js";

export class StudentRepository extends BaseRepository {
  constructor() {
    super(Student);
  }
  // add extra repo methods if needed
  async findByEmail(email) {
    return this.model.findOne({ email });
  }
  async findByStudentCode(code) {
    return this.model.findOne({ studentCode: code });
  }
}
