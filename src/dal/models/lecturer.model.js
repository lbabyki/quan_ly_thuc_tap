import mongoose from "mongoose";

const lecturerSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    department: { type: String },
    role: {
      type: String,
      enum: ["student", "lecturer", "company", "admin"],
      default: "lecturer",
    },
    password: { type: String, required: true },
    assignedStudents: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Lecturer", lecturerSchema);
