import { StudentRepository } from "../../dal/repositories/student.repository.js";

export class StudentService {
  constructor() {
    this.repo = new StudentRepository();
  }
  async createStudent(data) {
    return this.repo.create(data);
  }
  async getAllStudents() {
    return this.repo.find();
  }
  async getStudentById(id) {
    return this.repo.findById(id);
  }
  async updateStudent(id, data) {
    return this.repo.update(id, data);
  }
  async deleteStudent(id) {
    return this.repo.delete(id);
  }
}
