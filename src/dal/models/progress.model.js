import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  lecturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lecturer",
    required: true,
  },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const progressSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    internship: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Internship",
      required: true,
    },
    // Thêm reportType để phân loại
    reportType: {
      type: String,
      enum: ["weekly", "monthly", "final"],
      default: "weekly",
    },
    week: { type: Number, required: true },
    title: { type: String, required: true },
    content: { type: String },
    // Thêm attachments cho file đính kèm
    attachments: [{ type: String }],
    // Thêm status để theo dõi trạng thái
    status: {
      type: String,
      enum: ["draft", "submitted", "reviewed", "approved"],
      default: "submitted",
    },
    submittedAt: { type: Date, default: Date.now },
    feedbacks: [feedbackSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Progress", progressSchema);
