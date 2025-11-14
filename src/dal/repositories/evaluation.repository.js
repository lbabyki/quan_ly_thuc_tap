import BaseRepository from "../../core/base/BaseRepository.js";
import Evaluation from "../models/evaluation.model.js";

class EvaluationRepository extends BaseRepository {
  constructor() {
    super(Evaluation);
  }

  // Lấy toàn bộ đánh giá của 1 sinh viên
  getByStudent(studentId) {
    return this.model
      .find({ student: studentId })
      .populate("lecturer")
      .populate("progressReport");
  }

  // Lấy toàn bộ đánh giá do 1 giảng viên thực hiện
  getByLecturer(lecturerId) {
    return this.model.find({ lecturer: lecturerId }).populate("student");
  }

  // Lấy đánh giá theo report
  getByReport(reportId) {
    return this.model
      .findOne({ progressReport: reportId })
      .populate("student")
      .populate("lecturer");
  }
}

export default new EvaluationRepository();
