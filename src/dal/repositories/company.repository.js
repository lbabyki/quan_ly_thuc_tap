import { BaseRepository } from "../../core/base/BaseRepository.js";
import Company from "../models/company.model.js";

export class CompanyRepository extends BaseRepository {
  constructor() {
    super(Company);
  }

  async findByEmail(email) {
    return this.model.findOne({ contactEmail: email });
  }

  async getWithStudentCount() {
    return this.model.aggregate([
      {
        $lookup: {
          from: "students",
          localField: "_id",
          foreignField: "internshipCompany",
          as: "students"
        }
      },
      {
        $addFields: {
          studentCount: { $size: "$students" }
        }
      }
    ]);
  }
}