import { BaseRepository } from "../../core/base/BaseRepository.js";
import Internship from "../models/internship.model.js";

export class InternshipRepository extends BaseRepository {
  constructor() {
    super(Internship);
  }

  // Lấy các internship có status = 'open' (có thể lọc thêm)
  async findAvailable(filter = {}) {
    const q = { status: "open", ...filter };
    return this.model.find(q);
  }

  // Đăng ký sinh viên vào internship
  async registerStudent(internshipId, studentId, docUrl = null) {
    const internship = await this.model.findById(internshipId);
    if (!internship) return null;

    // nếu đã đăng ký thì trả về internship
    if (
      internship.students?.some((s) => s.toString() === studentId.toString())
    ) {
      return internship;
    }

    internship.students = internship.students || [];
    internship.students.push(studentId);

    // nếu có docUrl (thư giới thiệu) thì lưu vào một trường tạm (attachments) hoặc logs
    if (docUrl) {
      // tạo array attachments nếu muốn
      internship.attachments = internship.attachments || [];
      internship.attachments.push(docUrl);
    }

    await internship.save();
    return internship;
  }

  // Sinh viên đề xuất đề tài -> tạo 1 bản ghi internship với isSuggested = true
  async createSuggestion(payload) {
    const data = {
      isSuggested: true,
      suggestedBy: payload.suggestedBy,
      suggestedTitle: payload.suggestedTitle,
      suggestedDescription: payload.suggestedDescription,
      status: "pending",
      companyName: payload.companyName || `Suggested by ${payload.suggestedBy}`,
      position: payload.position || payload.suggestedTitle || "Suggested topic",
    };
    return this.model.create(data);
  }
}
