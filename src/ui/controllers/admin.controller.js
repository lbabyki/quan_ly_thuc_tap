import { sendSuccess, sendError } from "../../utils/response.js";
import { AdminService } from "../../bll/services/admin.service.js";
import { 
  createUserValidator, 
  updateUserValidator,
  semesterValidator 
} from "../../bll/validators/admin.validator.js";

const adminService = new AdminService();

export class AdminController {
  // ===== QUẢN LÝ NGƯỜI DÙNG =====
  static async getUsers(req, res) {
    try {
      const { type = "all", page = 1, limit = 10 } = req.query;
      const users = await adminService.getAllUsers(type, parseInt(page), parseInt(limit));
      return sendSuccess(res, { data: users });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  static async createUser(req, res) {
    try {
      const { error } = createUserValidator.validate(req.body);
      if (error) return sendError(res, { status: 400, message: error.details[0].message });

      const user = await adminService.createUser(req.body);
      return sendSuccess(res, { 
        status: 201, 
        message: "User created successfully", 
        data: user 
      });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  static async updateUser(req, res) {
    try {
      const { error } = updateUserValidator.validate(req.body);
      if (error) return sendError(res, { status: 400, message: error.details[0].message });

      const { userType } = req.query;
      const user = await adminService.updateUser(req.params.id, userType, req.body);
      return sendSuccess(res, { message: "User updated successfully", data: user });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  static async deleteUser(req, res) {
    try {
      const { userType } = req.query;
      await adminService.deleteUser(req.params.id, userType);
      return sendSuccess(res, { message: "User deleted successfully" });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  static async resetPassword(req, res) {
    try {
      const { userType } = req.query;
      const { newPassword } = req.body;
      await adminService.resetPassword(req.params.id, userType, newPassword);
      return sendSuccess(res, { message: "Password reset successfully" });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  // ===== QUẢN LÝ ĐỀ TÀI =====
  static async createInternship(req, res) {
    try {
      const internship = await adminService.createInternship(req.body);
      return sendSuccess(res, { 
        status: 201, 
        message: "Internship created", 
        data: internship 
      });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  static async updateInternship(req, res) {
    try {
      const internship = await adminService.updateInternship(req.params.id, req.body);
      return sendSuccess(res, { message: "Internship updated", data: internship });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  static async deleteInternship(req, res) {
    try {
      await adminService.deleteInternship(req.params.id);
      return sendSuccess(res, { message: "Internship deleted" });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  static async approveSuggestion(req, res) {
    try {
      const { approve, adminNotes } = req.body;
      const result = await adminService.approveSuggestion(req.params.id, approve, adminNotes);
      return sendSuccess(res, { 
        message: `Suggestion ${approve ? 'approved' : 'rejected'}`, 
        data: result 
      });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  // ===== QUẢN LÝ KỲ THỰC TẬP =====
  static async createSemester(req, res) {
    try {
      const { error } = semesterValidator.validate(req.body);
      if (error) return sendError(res, { status: 400, message: error.details[0].message });

      const semester = await adminService.createSemester(req.body);
      return sendSuccess(res, { 
        status: 201, 
        message: "Semester created", 
        data: semester 
      });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  static async updateSemester(req, res) {
    try {
      const semester = await adminService.updateSemester(req.params.id, req.body);
      return sendSuccess(res, { message: "Semester updated", data: semester });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  static async setActiveSemester(req, res) {
    try {
      await adminService.setActiveSemester(req.params.id);
      return sendSuccess(res, { message: "Active semester updated" });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  // ===== DASHBOARD & ANALYTICS =====
  static async getDashboard(req, res) {
    try {
      const stats = await adminService.getSystemStats();
      return sendSuccess(res, { data: stats });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  static async getAnalytics(req, res) {
    try {
      const { type } = req.query;
      const analytics = await adminService.getAnalytics(type);
      return sendSuccess(res, { data: analytics });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  // ===== QUẢN LÝ BÁO CÁO DOANH NGHIỆP =====
  static async getCompanyReports(req, res) {
    try {
      const { status, company, semester, page = 1, limit = 10 } = req.query;
      const filters = {};
      if (status) filters.status = status;
      if (company) filters.company = company;
      if (semester) filters.semester = semester;

      const reports = await adminService.getCompanyReports(filters, parseInt(page), parseInt(limit));
      return sendSuccess(res, { data: reports });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  static async approveCompanyReport(req, res) {
    try {
      const { adminNotes } = req.body;
      const report = await adminService.approveCompanyReport(req.params.id, adminNotes);
      return sendSuccess(res, { message: "Report approved", data: report });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  static async rejectCompanyReport(req, res) {
    try {
      const { adminNotes } = req.body;
      if (!adminNotes) {
        return sendError(res, { status: 400, message: "Admin notes required for rejection" });
      }
      
      const report = await adminService.rejectCompanyReport(req.params.id, adminNotes);
      return sendSuccess(res, { message: "Report rejected", data: report });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }
}