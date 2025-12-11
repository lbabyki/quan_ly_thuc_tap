import mongoose from "mongoose";

const companyReportSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true
  },
  semester: { type: String, required: true }, // "2024-1", "2024-2"
  year: { type: Number, required: true },
  
  // Đánh giá tổng quan
  overallAssessment: {
    totalStudents: { type: Number, required: true },
    completedStudents: { type: Number, required: true },
    averagePerformance: { type: Number, min: 0, max: 10 },
    recommendedStudents: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Student" 
    }]
  },
  
  // Nhận xét chi tiết
  detailedFeedback: {
    strengths: { type: String },
    weaknesses: { type: String },
    suggestions: { type: String },
    cooperationQuality: { 
      type: String, 
      enum: ["excellent", "good", "average", "poor"] 
    }
  },
  
  // Đề xuất cải thiện
  improvements: {
    curriculumSuggestions: { type: String },
    skillGaps: [{ type: String }],
    futureCollaboration: { type: Boolean, default: true }
  },
  
  // File đính kèm
  attachments: [{
    filename: { type: String },
    url: { type: String },
    type: { type: String } // "pdf", "image", "excel"
  }],
  
  // Trạng thái
  status: {
    type: String,
    enum: ["draft", "submitted", "reviewed", "approved"],
    default: "draft"
  },
  
  submittedAt: { type: Date },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Student" }, // Admin
  reviewedAt: { type: Date },
  adminNotes: { type: String }
  
}, { timestamps: true });

export default mongoose.model("CompanyReport", companyReportSchema);