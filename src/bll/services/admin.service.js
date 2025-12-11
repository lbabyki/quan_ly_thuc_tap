import { StudentRepository } from "../../dal/repositories/student.repository.js";
import { CompanyRepository } from "../../dal/repositories/company.repository.js";
import { CompanyReportRepository } from "../../dal/repositories/companyReport.repository.js";
import { InternshipRepository } from "../../dal/repositories/internship.repository.js";
import { ProgressRepository } from "../../dal/repositories/progress.repository.js";
import { SystemConfigRepository } from "../../dal/repositories/systemConfig.repository.js";
import { hashPassword } from "../../utils/hash.js";
import AppError from "../../utils/appError.js";

export class AdminService {
  constructor() {
    this.studentRepo = new StudentRepository();
    this.companyRepo = new CompanyRepository();
    this.reportRepo = new CompanyReportRepository();
    this.internshipRepo = new InternshipRepository();
    this.progressRepo = new ProgressRepository();
    this.configRepo = new SystemConfigRepository();
  }

  // ===== QUẢN LÝ NGƯỜI DÙNG =====
  async getAllUsers(type = "all", page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    let users = [];

    if (type === "all" || type === "students") {
      const students = await this.studentRepo.find({}, { skip, limit });
      users.push(
        ...students.map((u) => ({ ...u.toObject(), role: "student" }))
      );
    }

    if (type === "all" || type === "companies") {
      const companies = await this.companyRepo.find({}, { skip, limit });
      users.push(
        ...companies.map((u) => ({ ...u.toObject(), role: "company" }))
      );
    }

    return users;
  }

  async createUser(userData) {
    const { role, password, ...data } = userData;
    const hashedPassword = await hashPassword(password);

    if (role === "student" || role === "lecturer" || role === "admin") {
      return this.studentRepo.create({
        ...data,
        password: hashedPassword,
        role: role,
      });
    } else if (role === "company") {
      return this.companyRepo.create({
        ...data,
        password: hashedPassword,
      });
      s;
    }

    throw new AppError("Invalid user type", 400);
  }

  async updateUser(userId, role, updateData) {
    if (updateData.password) {
      updateData.password = await hashPassword(updateData.password);
    }

    if (role === "company") {
      return this.companyRepo.update(userId, updateData);
    } else {
      return this.studentRepo.update(userId, updateData);
    }
  }

  async deleteUser(userId, role) {
    if (role === "company") {
      return this.companyRepo.delete(userId);
    } else {
      return this.studentRepo.delete(userId);
    }
  }

  async resetPassword(userId, role, newPassword = "123456") {
    const hashedPassword = await hashPassword(newPassword);
    return this.updateUser(userId, role, { password: hashedPassword });
  }

  // ===== QUẢN LÝ ĐỀ TÀI & KỲ THỰC TẬP =====
  async createInternship(data) {
    return this.internshipRepo.create(data);
  }

  async updateInternship(id, data) {
    return this.internshipRepo.update(id, data);
  }

  async deleteInternship(id) {
    return this.internshipRepo.delete(id);
  }

  async approveSuggestion(id, approve, adminNotes = "") {
    const suggestion = await this.internshipRepo.findById(id);
    if (!suggestion?.isSuggested) {
      throw new AppError("Not a suggestion", 400);
    }

    return this.internshipRepo.update(id, {
      status: approve ? "approved" : "rejected",
      adminNotes,
    });
  }

  // ===== QUẢN LÝ KỲ THỰC TẬP =====
  async createSemester(semesterData) {
    return this.configRepo.create(semesterData);
  }

  async updateSemester(id, data) {
    return this.configRepo.update(id, data);
  }

  async getActiveSemester() {
    return this.configRepo.findOne({ isActive: true });
  }

  async setActiveSemester(id) {
    // Deactivate all
    await this.configRepo.updateMany({}, { isActive: false });
    // Activate selected
    return this.configRepo.update(id, { isActive: true });
  }

  // ===== GIÁM SÁT HỆ THỐNG =====
  async getSystemStats() {
    const [
      totalStudents,
      totalCompanies,
      totalInternships,
      pendingReports,
      activeInternships,
    ] = await Promise.all([
      this.studentRepo.count({ role: "student" }),
      this.companyRepo.count(),
      this.internshipRepo.count(),
      this.reportRepo.count({ status: "submitted" }),
      this.internshipRepo.count({ status: "open" }),
    ]);
    return {
      totalStudents,
      totalCompanies,
      totalInternships,
      pendingReports,
      activeInternships,
    };
  }

  async getProgressStats(filters = {}) {
    return this.progressRepo.aggregate([
      { $match: filters },
      {
        $group: {
          _id: "$student",
          reportCount: { $sum: 1 },
          lastReport: { $max: "$createdAt" },
        },
      },
    ]);
  }

  // ===== QUẢN LÝ BÁO CÁO DOANH NGHIỆP =====
  async getCompanyReports(filters = {}, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return this.reportRepo.find(filters, {
      skip,
      limit,
      populate: ["company", "reviewedBy"],
    });
  }

  async approveCompanyReport(reportId, adminNotes = "") {
    return this.reportRepo.update(reportId, {
      status: "approved",
      reviewedAt: new Date(),
      adminNotes,
    });
  }

  async rejectCompanyReport(reportId, adminNotes) {
    return this.reportRepo.update(reportId, {
      status: "rejected",
      reviewedAt: new Date(),
      adminNotes,
    });
  }

  // ===== ANALYTICS =====
  async getAnalytics(type = "overview") {
    switch (type) {
      case "department":
        return this.studentRepo.aggregate([
          { $match: { role: "student" } },
          { $group: { _id: "$department", count: { $sum: 1 } } },
        ]);

      case "company":
        return this.companyRepo.aggregate([
          {
            $lookup: {
              from: "students",
              localField: "_id",
              foreignField: "internshipCompany",
              as: "students",
            },
          },
          {
            $project: {
              companyName: 1,
              studentCount: { $size: "$students" },
            },
          },
        ]);

      default:
        return this.getSystemStats();
    }
  }
}
