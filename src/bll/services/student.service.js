import { StudentRepository } from "../../dal/repositories/student.repository.js";

export class StudentService {
  constructor() {
    this.repo = new StudentRepository();
  }

  async createStudent(data) {
    return await this.repo.create(data);
  }

  async getAllStudents() {
    return await this.repo.findAll();
  }

  async getStudentById(id) {
    return await this.repo.findById(id);
  }

  async updateStudent(id, data) {
    return await this.repo.update(id, data);
  }

  async deleteStudent(id) {
    return await this.repo.delete(id);
  }
}
