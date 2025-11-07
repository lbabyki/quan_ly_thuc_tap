import mongoose from "mongoose";
export async function connectDB(uri) {
  if (process.env.NODE_ENV === "test") {
    console.log("🧪 Skipping real DB connection in test mode");
    return;
  }
  if (!uri) throw new Error("MONGODB_URI required");
  await mongoose.connect(uri, { autoIndex: true });
  console.log("🗄️ Connected to MongoDB");
}
