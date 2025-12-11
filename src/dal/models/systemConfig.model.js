// CẦN TẠO HOÀN TOÀN
import mongoose from "mongoose";

const systemConfigSchema = new mongoose.Schema({
  semester: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  reportDeadlines: [{
    type: { type: String, enum: ["weekly", "monthly", "final"] },
    deadline: { type: Date }
  }],
  defenseSchedule: {
    startDate: { type: Date },
    endDate: { type: Date }
  },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("SystemConfig", systemConfigSchema);