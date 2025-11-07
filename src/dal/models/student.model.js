import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    studentCode: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    department: { type: String },
    internshipCompany: { type: String },
    cvUrl: { type: String },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    // Auth fields
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["student", "lecturer", "company", "admin"],
      default: "student",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
