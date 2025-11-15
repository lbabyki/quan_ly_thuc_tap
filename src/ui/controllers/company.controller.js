import { sendSuccess, sendError } from "../../utils/response.js";
import { CompanyService } from "../../bll/services/company.service.js";

const service = new CompanyService();

export class CompanyController {
  static async register(req, res) {
    try {
      const result = await service.register(req.body);
      return sendSuccess(res, {
        status: 201,
        message: "Company registered successfully",
        data: result,
      });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }
  static async login(req, res) {
    try {
      const result = await service.login(req.body);
      return sendSuccess(res, {
        status: 200,
        message: "Login successful",
        data: result,
      });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  static async getStudents(req, res) {
    try {
      const students = await service.getAssignedStudents(req.user.id);
      return sendSuccess(res, { data: students });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  static async evaluateStudent(req, res) {
    try {
      const evaluation = await service.evaluateStudent(
        req.user.id,
        req.params.id,
        req.body
      );
      return sendSuccess(res, {
        message: "Student evaluated successfully",
        data: evaluation,
      });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  static async getProfile(req, res) {
    try {
      const company = await service.getProfile(req.user.id);
      return sendSuccess(res, { data: company });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  static async updateProfile(req, res) {
    try {
      const company = await service.updateProfile(req.user.id, req.body);
      return sendSuccess(res, {
        message: "Profile updated successfully",
        data: company,
      });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  static async confirmStudent(req, res) {
    try {
      await service.confirmStudent(req.user.id, req.params.id);
      return sendSuccess(res, {
        message: "Student confirmed successfully",
      });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  static async createReport(req, res) {
    try {
      const report = await service.createCompanyReport(req.user.id, req.body);
      return sendSuccess(res, {
        status: 201,
        message: "Report created successfully",
        data: report,
      });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  static async getMyReports(req, res) {
    try {
      const reports = await service.getCompanyReports(req.user.id, req.query);
      return sendSuccess(res, { data: reports });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }
}
