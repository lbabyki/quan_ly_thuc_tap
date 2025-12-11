import cron from "node-cron";
import { NotificationService } from "./notification.service.js";
import { StudentRepository } from "../../dal/repositories/student.repository.js";
import { InternshipRepository } from "../../dal/repositories/internship.repository.js";
import SystemConfig from "../../dal/models/systemConfig.model.js";

export class NotificationScheduler {
  constructor() {
    this.notificationService = new NotificationService();
    this.studentRepo = new StudentRepository();
    this.internshipRepo = new InternshipRepository();
    this.isRunning = false;
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;

    // Chạy mỗi ngày lúc 9:00 AM
    cron.schedule("0 9 * * *", () => {
      this.checkDeadlineReminders();
    });

    // Chạy mỗi thứ 2 lúc 8:00 AM (nhắc báo cáo tuần)
    cron.schedule("0 8 * * 1", () => {
      this.sendWeeklyReportReminders();
    });

    console.log("📅 Notification scheduler started");
  }

  stop() {
    this.isRunning = false;
    console.log("📅 Notification scheduler stopped");
  }

  async checkDeadlineReminders() {
    try {
      const activeSemester = await SystemConfig.findOne({ isActive: true });
      if (!activeSemester) return;

      const students = await this.studentRepo.find({ 
        role: "student", 
        status: "approved",
        internshipCompany: { $exists: true }
      });

      const now = new Date();
      
      for (const deadline of activeSemester.reportDeadlines) {
        const daysLeft = Math.ceil((deadline.deadline - now) / (1000 * 60 * 60 * 24));
        
        // Nhắc nhở khi còn 7, 3, 1 ngày
        if ([7, 3, 1].includes(daysLeft)) {
          for (const student of students) {
            await this.notificationService.notifyDeadlineReminder(
              student, 
              deadline.deadline, 
              daysLeft
            );
          }
        }
      }

      console.log(`✅ Checked deadline reminders for ${students.length} students`);
    } catch (error) {
      console.error("❌ Error checking deadline reminders:", error.message);
    }
  }

  async sendWeeklyReportReminders() {
    try {
      const students = await this.studentRepo.find({ 
        role: "student", 
        status: "approved",
        internshipCompany: { $exists: true }
      });

      for (const student of students) {
        await this.notificationService.sendEmail(
          student.email,
          "📝 Nhắc nhở nộp báo cáo tuần",
          `
            <h3>Xin chào ${student.fullName},</h3>
            <p>Đây là thông báo nhắc nhở nộp báo cáo tuần thực tập.</p>
            <p>Vui lòng hoàn thành và nộp báo cáo trong tuần này.</p>
            <p><a href="${process.env.CLIENT_URL}/student/progress">Nộp báo cáo ngay</a></p>
          `,
          true
        );
      }

      console.log(`✅ Sent weekly reminders to ${students.length} students`);
    } catch (error) {
      console.error("❌ Error sending weekly reminders:", error.message);
    }
  }

  // Manual trigger methods
  async triggerDeadlineCheck() {
    await this.checkDeadlineReminders();
  }

  async triggerWeeklyReminders() {
    await this.sendWeeklyReportReminders();
  }
}