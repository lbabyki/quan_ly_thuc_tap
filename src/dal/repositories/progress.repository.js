import { BaseRepository } from "../../core/base/BaseRepository.js";
import Progress from "../models/progress.model.js";
export class ProgressRepository extends BaseRepository {
  constructor() {
    super(Progress);
  }
  addFeedback(progressId, lecturerId, message) {
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
      .populate({
        path: "feedbacks.lecturer",
        select: "name email",
      });
  }
}

export default new ProgressRepository();
