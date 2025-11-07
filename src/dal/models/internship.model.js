import mongoose from "mongoose";
const internshipSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    address: { type: String },
    contactPerson: { type: String },
    contactEmail: { type: String },
    contactPhone: { type: String },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  },
  { timestamps: true }
);
export default mongoose.model("Internship", internshipSchema);
