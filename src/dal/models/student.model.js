import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    fullName: { type: String },
    studentCode: { type: String, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    department: { type: String },
    internshipCompany: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Internship",
    },
    cvUrl: { type: String },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["student", "lecturer", "company", "admin"],
      default: "student",
    },
    skills: [{ type: String }],
    year: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
