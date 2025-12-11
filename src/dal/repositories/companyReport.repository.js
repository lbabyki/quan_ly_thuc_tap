import { BaseRepository } from "../../core/base/BaseRepository.js";
import CompanyReport from "../models/companyReport.model.js";

export class CompanyReportRepository extends BaseRepository {
  constructor() {
    super(CompanyReport);
  }

  async findWithCompanyInfo(filters = {}) {
    return this.model.find(filters)
      .populate("company", "companyName contactEmail")
      .populate("reviewedBy", "userName email")
      .sort({ createdAt: -1 });
  }

  async getReportStats() {
    return this.model.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);
  }
}