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
        data: result 
      });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  static async getStudents(req, res) {
    try {
      const students = await service.getAssignedStudents(req.user._id);
      return sendSuccess(res, { data: students });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  static async evaluateStudent(req, res) {
    try {
      const evaluation = await service.evaluateStudent(
        req.user._id, 
        req.params.id, 
        req.body
      );
      return sendSuccess(res, { 
        message: "Student evaluated successfully", 
        data: evaluation 
      });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  // NEW: Company report feature
  static async createReport(req, res) {
    try {
      const report = await service.createCompanyReport(req.user._id, req.body);
      return sendSuccess(res, { 
        message: "Company report created successfully", 
        data: report 
      });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }
}