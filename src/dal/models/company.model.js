import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    address: { type: String },
    contactPerson: { type: String, required: true },
    contactEmail: { type: String, required: true, unique: true },
    contactPhone: { type: String },
    password: { type: String, required: true },
    role: { type: String, default: "company" },
    internshipPositions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Internship" },
    ],
    currentStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

export default mongoose.model("Company", companySchema);
