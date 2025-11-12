// src/bll/services/internship.service.js
import { InternshipRepository } from "../../dal/repositories/internship.repository.js";
import { StudentRepository } from "../../dal/repositories/student.repository.js";

export class InternshipService {
  constructor() {
    this.repo = new InternshipRepository();
    this.studentRepo = new StudentRepository();
  }

  async create(data) {
    return this.repo.create(data);
  }

  async getById(id) {
    return this.repo.findById(id);
  }

  async list() {
    return this.repo.find();
  }

  // list internships that are open
  async listAvailable(filter = {}) {
    return this.repo.findAvailable(filter);
  }

  // register student to an internship (studentId is ObjectId/string)
  async registerByStudent(studentId, internshipId, docUrl = null) {
    // ensure student exists
    const student = await this.studentRepo.findById(studentId);
    if (!student) throw new Error("Student not found");

    // ensure internship exists
    const internship = await this.repo.findById(internshipId);
    if (!internship) throw new Error("Internship not found");

    // check internship status
    if (internship.status !== "open")
      throw new Error("Internship not open for registration");

    // register
    const updated = await this.repo.registerStudent(
      internshipId,
      studentId,
      docUrl
    );

    // update student record's internshipCompany if not set
    if (!student.internshipCompany) {
      await this.studentRepo.update(studentId, {
        internshipCompany: internship._id,
      });
    }

    return updated;
  }

  // student suggests a topic
  async suggestTopic(studentId, payload) {
    const suggestion = await this.repo.createSuggestion({
      ...payload,
      suggestedBy: studentId,
    });
    return suggestion;
  }

  // get internship record for a given student
  async getMyInternship(studentId) {
    const student = await this.studentRepo.findById(studentId);
    if (!student) throw new Error("Student not found");
    if (!student.internshipCompany) return null;
    return this.repo.findById(student.internshipCompany);
  }
  async listSuggestions() {
    // Lấy tất cả đề xuất (isSuggested = true và status pending)
    return this.repo.find({ isSuggested: true, status: "pending" });
  }

  async reviewSuggestion(id, approve) {
    const suggestion = await this.repo.findById(id);
    if (!suggestion) throw new Error("Suggestion not found");
    if (!suggestion.isSuggested) throw new Error("Not a suggested topic");

    suggestion.status = approve ? "approved" : "rejected";
    await suggestion.save();

    return suggestion;
  }
  async cancelRegistration(studentId) {
    const student = await this.studentRepo.findById(studentId);
    if (!student) throw new Error("Student not found");
    if (!student.internshipCompany)
      throw new Error("Student not registered for internship");

    const internship = await this.repo.findById(student.internshipCompany);
    if (!internship) throw new Error("Internship not found");

    // Chỉ cho phép hủy nếu internship chưa approved
    if (internship.status === "approved") {
      throw new Error("Cannot cancel after internship is approved");
    }

    // Xóa student khỏi danh sách students trong internship
    internship.students = internship.students.filter(
      (s) => s.toString() !== studentId.toString()
    );
    await internship.save();

    // Xóa trường internshipCompany của student
    await this.studentRepo.update(studentId, { internshipCompany: null });

    return true;
  }
}
