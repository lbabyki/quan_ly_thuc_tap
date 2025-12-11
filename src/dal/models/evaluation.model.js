import mongoose from "mongoose";

const evaluationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    lecturer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lecturer",
      required: true,
    },
    progressReport: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Progress",
      required: false,
    },
    scoreProcess: { type: Number, min: 0, max: 10 },
    scoreReport: { type: Number, min: 0, max: 10 },
    scoreDefense: { type: Number, min: 0, max: 10 },
    comments: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Evaluation", evaluationSchema);
