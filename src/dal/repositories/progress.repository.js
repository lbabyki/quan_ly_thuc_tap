import { BaseRepository } from "../../core/base/BaseRepository.js";
import Progress from "../models/progress.model.js";

export class ProgressRepository extends BaseRepository {
  constructor() {
    super(Progress);
  }

  // Override find để có populate mặc định
  async find(query = {}) {
    return this.model
      .find(query)
      .populate("student", "name email studentId")
      .populate("internship", "title company")
      .populate("feedbacks.lecturer", "name email")
      .sort({ createdAt: -1 });
  }

  // Override findById để có populate
  async findById(id) {
    return this.model
      .findById(id)
      .populate("student", "name email studentId")
      .populate("internship", "title company")
      .populate("feedbacks.lecturer", "name email");
  }

  // Thêm feedback vào progress
  async addFeedback(progressId, lecturerId, message) {
    return this.model
      .findByIdAndUpdate(
        progressId,
        {
          $push: {
            feedbacks: { lecturer: lecturerId, message },
          },
        },
        { new: true }
      )
      .populate("student", "name email")
      .populate("internship", "title company")
      .populate("feedbacks.lecturer", "name email");
  }

  // Lấy progress theo student và week
  async findByStudentAndWeek(studentId, week) {
    return this.model
      .find({ student: studentId, week })
      .populate("student", "name email")
      .populate("internship", "title company")
      .populate("feedbacks.lecturer", "name email");
  }
}

export default new ProgressRepository();
