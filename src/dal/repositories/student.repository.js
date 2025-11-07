import Student from "../models/student.model.js";

export class StudentRepository {
  async create(data) {
    return await Student.create(data);
  }

  async findAll() {
    return await Student.find();
  }

  async findById(id) {
    return await Student.findById(id);
  }

  async update(id, data) {
    return await Student.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Student.findByIdAndDelete(id);
  }
}
