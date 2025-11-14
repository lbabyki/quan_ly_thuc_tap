import { CompanyRepository } from "../../dal/repositories/company.repository.js";
import { CompanyReportRepository } from "../../dal/repositories/companyReport.repository.js";
import { StudentRepository } from "../../dal/repositories/student.repository.js";
import { hashPassword } from "../../utils/hash.js";
import { signToken } from "../../utils/token.js";
import AppError from "../../utils/appError.js";

export class CompanyService {
  constructor() {
    this.repo = new CompanyRepository();
    this.reportRepo = new CompanyReportRepository();
    this.studentRepo = new StudentRepository();
  }

  async register(data) {
    const { companyName, contactEmail, password, ...rest } = data;
    
    const existing = await this.repo.findOne({ contactEmail });
    if (existing) throw new AppError("Email already registered", 400);

    const hashedPassword = await hashPassword(password);
    const company = await this.repo.create({
      companyName,
      contactEmail,
      password: hashedPassword,
      role: "company",
      ...rest
    });

    const token = signToken({ id: company._id, role: "company" });
    return { company, token };
  }

  async getAssignedStudents(companyId) {
    const company = await this.repo.findById(companyId).populate("currentStudents");
    return company?.currentStudents || [];
  }

  async evaluateStudent(companyId, studentId, evaluationData) {
    // Implementation for company evaluation
    const evaluation = {
      company: companyId,
      student: studentId,
      ...evaluationData,
      evaluatedAt: new Date()
    };
    
    // Save to CompanyEvaluation model (need to create)
    return evaluation;
  }

  // NEW: Company report functionality
  async createCompanyReport(companyId, reportData) {
    const report = await this.reportRepo.create({
      company: companyId,
      ...reportData,
      submittedAt: new Date(),
      status: "submitted"
    });
    
    // Notify admin about new company report
    // TODO: Add notification service
    
    return report;
  }

  async getCompanyReports(companyId, filters = {}) {
    return this.reportRepo.find({ company: companyId, ...filters });
  }
}