// src/dal/models/internship.model.js
import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema(
  {
    student: {
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
