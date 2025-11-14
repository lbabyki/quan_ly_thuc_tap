import nodemailer from "nodemailer";
import twilio from "twilio";

export class NotificationService {
  constructor() {
    this.transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Twilio SMS setup
    this.twilioClient = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
  }

  async sendEmail(to, subject, content, isHtml = false) {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        [isHtml ? "html" : "text"]: content,
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log(`✅ Email sent to ${to}: ${subject}`);
      return result;
    } catch (error) {
      console.error(`❌ Email failed to ${to}:`, error.message);
      throw error;
    }
  }

  async sendSMS(phone, message) {
    try {
      if (!process.env.TWILIO_PHONE_NUMBER) {
        console.log(`📱 SMS (Demo): ${phone} - ${message}`);
        return { status: "demo" };
      }

      const result = await this.twilioClient.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone,
      });

      console.log(`✅ SMS sent to ${phone}`);
      return result;
    } catch (error) {
      console.error(`❌ SMS failed to ${phone}:`, error.message);
      throw error;
    }
  }

  // STUDENT NOTIFICATIONS
  async notifyDeadlineReminder(student, deadline, daysLeft) {
    const subject = `⏰ Nhắc nhở: Còn ${daysLeft} ngày đến hạn nộp báo cáo`;
    const emailContent = `
      <h3>Xin chào ${student.fullName},</h3>
      <p>Đây là thông báo nhắc nhở về hạn nộp báo cáo thực tập:</p>
      <ul>
        <li><strong>Hạn nộp:</strong> ${deadline.toLocaleDateString(
          "vi-VN"
        )}</li>
        <li><strong>Còn lại:</strong> ${daysLeft} ngày</li>
        <li><strong>Loại báo cáo:</strong> Báo cáo tuần</li>
      </ul>
      <p>Vui lòng hoàn thành và nộp báo cáo đúng hạn.</p>
      <p><a href="${
        process.env.CLIENT_URL
      }/student/progress">Nộp báo cáo ngay</a></p>
    `;

    const smsContent = `[THỰC TẬP] Còn ${daysLeft} ngày đến hạn nộp báo cáo (${deadline.toLocaleDateString(
      "vi-VN"
    )}). Truy cập hệ thống để nộp báo cáo.`;

    await Promise.all(
      [
        this.sendEmail(student.email, subject, emailContent, true),
        student.phone ? this.sendSMS(student.phone, smsContent) : null,
      ].filter(Boolean)
    );
  }

  async notifyInternshipApproved(student, internship) {
    const subject = `✅ Đăng ký thực tập được chấp nhận`;
    const emailContent = `
      <h3>Xin chào ${student.fullName},</h3>
      <p>Chúc mừng! Đăng ký thực tập của bạn đã được chấp nhận:</p>
      <ul>
        <li><strong>Đề tài:</strong> ${internship.position}</li>
        <li><strong>Công ty:</strong> ${internship.companyName}</li>
        <li><strong>Thời gian:</strong> ${internship.startDate?.toLocaleDateString(
          "vi-VN"
        )} - ${internship.endDate?.toLocaleDateString("vi-VN")}</li>
      </ul>
      <p>Vui lòng liên hệ với công ty để bắt đầu thực tập.</p>
    `;

    const smsContent = `[THỰC TẬP] Đăng ký thực tập "${internship.position}" tại ${internship.companyName} đã được chấp nhận. Chúc mừng!`;

    await Promise.all(
      [
        this.sendEmail(student.email, subject, emailContent, true),
        student.phone ? this.sendSMS(student.phone, smsContent) : null,
      ].filter(Boolean)
    );
  }

  async notifyEvaluationReceived(student, evaluation, evaluator) {
    const subject = `📊 Nhận được đánh giá từ ${
      evaluator.role === "lecturer" ? "giảng viên" : "doanh nghiệp"
    }`;
    const emailContent = `
      <h3>Xin chào ${student.fullName},</h3>
      <p>Bạn đã nhận được đánh giá mới:</p>
      <ul>
        <li><strong>Người đánh giá:</strong> ${
          evaluator.fullName || evaluator.companyName
        }</li>
        <li><strong>Điểm quá trình:</strong> ${
          evaluation.scoreProcess || "Chưa có"
        }</li>
        <li><strong>Điểm báo cáo:</strong> ${
          evaluation.scoreReport || "Chưa có"
        }</li>
        <li><strong>Nhận xét:</strong> ${evaluation.comments || "Không có"}</li>
      </ul>
      <p><a href="${
        process.env.CLIENT_URL
      }/student/evaluations">Xem chi tiết</a></p>
    `;

    await this.sendEmail(student.email, subject, emailContent, true);
  }

  async notifyProgressReportReviewed(student, report, status, feedback) {
    const subject = `📝 Báo cáo tuần ${report.week} đã được xem xét`;
    const statusText =
      status === "approved" ? "được chấp nhận" : "cần chỉnh sửa";

    const emailContent = `
      <h3>Xin chào ${student.fullName},</h3>
      <p>Báo cáo tuần ${report.week} của bạn đã ${statusText}:</p>
      <ul>
        <li><strong>Tiêu đề:</strong> ${report.title}</li>
        <li><strong>Trạng thái:</strong> ${statusText}</li>
        ${feedback ? `<li><strong>Phản hồi:</strong> ${feedback}</li>` : ""}
      </ul>
      <p><a href="${
        process.env.CLIENT_URL
      }/student/progress">Xem chi tiết</a></p>
    `;

    await this.sendEmail(student.email, subject, emailContent, true);
  }

  async notifySystemAnnouncement(student, title, message) {
    const subject = `📢 Thông báo: ${title}`;
    const emailContent = `
      <h3>Xin chào ${student.fullName},</h3>
      <h4>${title}</h4>
      <p>${message}</p>
      <p><em>Thông báo từ hệ thống quản lý thực tập</em></p>
    `;

    await this.sendEmail(student.email, subject, emailContent, true);
  }
}
