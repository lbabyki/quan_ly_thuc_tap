import mongoose from "mongoose";
export async function connectDB(uri) {
  if (!uri) throw new Error("MONGODB_URI required");
  await mongoose.connect(uri, { autoIndex: true });
  console.log("🗄️ Connected to MongoDB");
}
