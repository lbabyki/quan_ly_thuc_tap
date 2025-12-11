import { ProgressRepository } from "../../dal/repositories/progress.repository.js";
import { StudentRepository } from "../../dal/repositories/student.repository.js";
import { NotificationService } from "./notification.service.js";

export class ProgressService {
  constructor() {
    this.repo = new ProgressRepository();
    this.studentRepo = new StudentRepository();
    this.notificationService = new NotificationService();
  }
  async create(data) {
    const progress = await this.repo.create(data);

    // Thông báo cho giảng viên khi sinh viên nộp báo cáo
    const student = await this.studentRepo.findById(data.student);
    if (student?.assignedLecturer) {
      const lecturer = await this.studentRepo.findById(
        student.assignedLecturer
      );
      if (lecturer) {
        await this.notificationService.sendEmail(
          lecturer.email,
          `📝 Sinh viên ${student.fullName} đã nộp báo cáo tuần ${data.week}`,
          `
            <h3>Thông báo báo cáo mới</h3>
            <p>Sinh viên <strong>${student.fullName}</strong> đã nộp báo cáo:</p>
            <ul>
              <li><strong>Tuần:</strong> ${data.week}</li>
              <li><strong>Tiêu đề:</strong> ${data.title}</li>
            </ul>
            <p><a href="${process.env.CLIENT_URL}/lecturer/progress">Xem và đánh giá</a></p>
          `,
          true
        );
      }
    }

    return progress;
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
  async updateStatus(id, status, feedback = null, reviewerId = null) {
    const progress = await this.repo.update(id, {
      status,
      feedback,
      reviewedBy: reviewerId,
      reviewedAt: new Date(),
    });

    // Thông báo cho sinh viên khi báo cáo được xem xét
    const student = await this.studentRepo.findById(progress.student);
    if (student) {
      await this.notificationService.notifyProgressReportReviewed(
        student,
        progress,
        status,
        feedback
      );
    }

    return progress;
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
