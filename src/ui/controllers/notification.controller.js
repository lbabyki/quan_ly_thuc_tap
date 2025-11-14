import { sendSuccess, sendError } from "../../utils/response.js";
import { NotificationService } from "../../bll/services/notification.service.js";
import { NotificationScheduler } from "../../bll/services/notification.scheduler.js";
import { StudentRepository } from "../../dal/repositories/student.repository.js";

const notificationService = new NotificationService();
const scheduler = new NotificationScheduler();
const studentRepo = new StudentRepository();

export class NotificationController {
  // Test gửi email
  static async testEmail(req, res) {
    try {
      const { email, subject, message } = req.body;

      await notificationService.sendEmail(email, subject, message);

      return sendSuccess(res, {
        message: "Test email sent successfully",
      });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  // Test gửi SMS
  static async testSMS(req, res) {
    try {
      const { phone, message } = req.body;

      await notificationService.sendSMS(phone, message);

      return sendSuccess(res, {
        message: "Test SMS sent successfully",
      });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  // Gửi thông báo hàng loạt
  static async sendBulkNotification(req, res) {
    try {
      const {
        title,
        message,
        targetRole = "student",
        method = "email",
      } = req.body;

      const users = await studentRepo.find({
        role: targetRole,
        status: "approved",
      });

      const promises = users
        .map((user) => {
          if (method === "email") {
            return notificationService.sendEmail(user.email, title, message);
          } else if (method === "sms" && user.phone) {
            return notificationService.sendSMS(user.phone, message);
          }
        })
        .filter(Boolean);

      await Promise.all(promises);

      return sendSuccess(res, {
        message: `Bulk notification sent to ${promises.length} users`,
      });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  // Trigger manual deadline check
  static async triggerDeadlineCheck(req, res) {
    try {
      await scheduler.triggerDeadlineCheck();

      return sendSuccess(res, {
        message: "Deadline check triggered successfully",
      });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  // Trigger weekly reminders
  static async triggerWeeklyReminders(req, res) {
    try {
      await scheduler.triggerWeeklyReminders();

      return sendSuccess(res, {
        message: "Weekly reminders sent successfully",
      });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }
}
