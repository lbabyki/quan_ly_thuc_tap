// src/dal/models/internship.model.js
import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    address: { type: String },
    contactPerson: { type: String },
    contactEmail: { type: String },
    contactPhone: { type: String },
    // danh sách sinh viên đã đăng ký
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    // trạng thái của vị trí/đợt thực tập
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "open", "closed"],
      default: "open",
    },
    // nếu đây là 1 đề xuất đề tài do sinh viên gửi:
    isSuggested: { type: Boolean, default: false },
    suggestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      default: null,
    },
    suggestedTitle: { type: String },
    suggestedDescription: { type: String },
    // thêm fields mô tả vị trí
    position: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Internship", internshipSchema);
