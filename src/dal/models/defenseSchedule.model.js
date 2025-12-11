import mongoose from "mongoose";

const defenseScheduleSchema = new mongoose.Schema(
  {
    lecturer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lecturer",
      required: true,
    },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    date: { type: Date, required: true },
    location: { type: String, required: true },
    notes: { type: String },
    minutes: { type: String }, // biên bản chấm
    finalized: { type: Boolean, default: false }, // đã xác nhận kết quả chưa
  },
  { timestamps: true }
);

export default mongoose.model("DefenseSchedule", defenseScheduleSchema);
