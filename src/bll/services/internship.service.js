// src/bll/services/internship.service.js
import { InternshipRepository } from "../../dal/repositories/internship.repository.js";
import { StudentRepository } from "../../dal/repositories/student.repository.js";
import { NotificationService } from "./notification.service.js";

export class InternshipService {
  constructor() {
    this.repo = new InternshipRepository();
    this.studentRepo = new StudentRepository();
    this.notificationService = new NotificationService();
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
    const student = await this.studentRepo.findById(studentId);
    if (!student) throw new Error("Student not found");

    const internship = await this.repo.findById(internshipId);
    if (!internship) throw new Error("Internship not found");

    if (internship.status !== "open")
      throw new Error("Internship not open for registration");

    const updated = await this.repo.registerStudent(
      internshipId,
      studentId,
      docUrl
    );

    if (!student.internshipCompany) {
      await this.studentRepo.update(studentId, {
        internshipCompany: internship._id,
      });
    }

    // Thông báo đăng ký thành công
    await this.notificationService.notifyInternshipApproved(
      student,
      internship
    );

    // Thông báo cho công ty
    if (internship.contactEmail) {
      await this.notificationService.sendEmail(
        internship.contactEmail,
        `👨‍🎓 Sinh viên mới đăng ký thực tập`,
        `
          <h3>Thông báo đăng ký thực tập</h3>
          <p>Sinh viên <strong>${student.fullName}</strong> đã đăng ký thực tập:</p>
          <ul>
            <li><strong>Mã sinh viên:</strong> ${student.studentCode}</li>
            <li><strong>Email:</strong> ${student.email}</li>
            <li><strong>Khoa:</strong> ${student.department}</li>
            <li><strong>Vị trí:</strong> ${internship.position}</li>
          </ul>
        `,
        true
      );
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

    // Thông báo cho sinh viên đề xuất
    const student = await this.studentRepo.findById(suggestion.suggestedBy);
    if (student) {
      const subject = approve
        ? `✅ Đề xuất đề tài được chấp nhận`
        : `❌ Đề xuất đề tài bị từ chối`;

      const content = `
        <h3>Xin chào ${student.fullName},</h3>
        <p>Đề xuất đề tài "${suggestion.suggestedTitle}" của bạn đã ${
        approve ? "được chấp nhận" : "bị từ chối"
      }.</p>
        ${
          approve
            ? "<p>Bạn có thể bắt đầu đăng ký thực tập với đề tài này.</p>"
            : "<p>Vui lòng xem xét đề xuất đề tài khác.</p>"
        }
      `;

      await this.notificationService.sendEmail(
        student.email,
        subject,
        content,
        true
      );
    }

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
