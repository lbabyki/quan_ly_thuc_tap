import mongoose from "mongoose";

const { Schema } = mongoose;

const LecturerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  password: { type: String, required: true },
  department: { type: String },
  role: { type: String, default: "lecturer" },
  assignedInternships: [{ type: Schema.Types.ObjectId, ref: "Internship" }],
  assignedStudents: [{ type: Schema.Types.ObjectId, ref: "Student" }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Lecturer", LecturerSchema);
