import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "../config/db.js";
import Student from "../dal/models/student.model.js";
import { hashPassword } from "../utils/hash.js";

const seedAdmin = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    console.log("🔗 Connected to database");

    // Check if admin already exists
    const existingAdmin = await Student.findOne({
      email: "admin@gmail.com",
      role: "admin",
    });

    if (existingAdmin) {
      console.log("⚠️  Admin account already exists!");
      console.log("📧 Email:", existingAdmin.email);
      console.log("👤 Role:", existingAdmin.role);
      process.exit(0);
    }

    // Create admin account
    const hashedPassword = await hashPassword("123456");

    const admin = await Student.create({
      userName: "System Administrator",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
      fullName: "System Administrator",
      department: "IT Department",
      status: "approved",
      studentCode: "000000",
    });

    console.log("✅ Admin account created successfully!");
    console.log("📧 Email: admin@gmail.com");
    console.log("🔑 Password: 123456");
    console.log("👤 Role: admin");
    console.log("🆔 ID:", admin._id);
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
  } finally {
    process.exit(0);
  }
};

seedAdmin();
