import Student from "../../dal/models/student.model.js";
import Lecturer from "../../dal/models/lecturer.model.js";
import Company from "../../dal/models/company.model.js";
import { hashPassword, comparePassword } from "../../utils/hash.js";
import { signToken as generateToken } from "../../utils/token.js";
import errorHandler from "../../middleware/error.middleware.js";
import AppError from "../../utils/appError.js";
export class AuthService {
  static async register(data, currentUser) {
    const { userName, email, password, role = "student" } = data;

    // Kiểm tra quyền tạo tài khoản
    if (role !== "student" && (!currentUser || currentUser.role !== "admin")) {
      throw new errorHandler("Only admin can create non-student accounts", 403);
    }

    const existing = await Student.findOne({ email });
    if (existing) throw new errorHandler("Email already registered", 400);

    const hashed = await hashPassword(password);
    const user = await Student.create({
      userName,
      email,
      password: hashed,
      role,
    });
    const token = generateToken({ id: user._id, role: user.role });

    return { user, token };
  }

  static async login(data) {
    const { email, password } = data;

    let user = await Student.findOne({ email });
    if (!user) user = await Lecturer.findOne({ email });
    if (!user) throw new AppError("User not found", 404);
    console.log("password:", password);
    console.log("user password", user.password);
    const valid = await comparePassword(password, user.password);
    if (!valid) throw new AppError("Invalid credentials", 401);

    const token = generateToken({ id: user._id, role: user.role });
    return { user, token };
  }
}
