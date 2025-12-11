import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: { type: mongoose.Schema.Types.ObjectId, required: true },
    recipientModel: {
      type: String,
      enum: ["Student", "Lecturer", "Company"],
      required: true,
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ["info", "warning", "success", "error"],
      default: "info",
    },
    read: { type: Boolean, default: false },
    actionUrl: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
