import mongoose from "mongoose";
const progressSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    week: { type: Number, required: true },
    title: { type: String, required: true },
    content: { type: String },
    attachments: [{ type: String }],
  },
  { timestamps: true }
);
export default mongoose.model("Progress", progressSchema);
