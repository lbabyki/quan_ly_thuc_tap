import mongoose from "mongoose";

const { Schema } = mongoose;

const LecturerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  department: { type: String },
  role: { type: String, default: "lecturer" },
  assignedInternships: [{ type: Schema.Types.ObjectId, ref: "Internship" }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Lecturer", LecturerSchema);
