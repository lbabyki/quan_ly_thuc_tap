import { StudentRepository } from "../../dal/repositories/student.repository.js";
import { hashPassword, comparePassword } from "../../utils/hash.js";
import { signToken } from "../../utils/token.js";

export class AuthService {
  constructor() {
    this.repo = new StudentRepository();
  }

  async register(payload) {
    const exists = await this.repo.findOne({
      $or: [{ email: payload.email }, { studentCode: payload.studentCode }],
    });
    if (exists) throw new Error("Email or studentCode already taken");
    const hashed = await hashPassword(payload.password);
    const userData = { ...payload, password: hashed };
    const user = await this.repo.create(userData);
    // don't return password in response
    user.password = undefined;
    const token = signToken({ id: user._id, role: user.role });
    return { user, token };
  }

  async login({ email, password }) {
    const user = await this.repo.findByEmail(email);
    if (!user) throw new Error("Invalid credentials");
    const ok = await comparePassword(password, user.password);
    if (!ok) throw new Error("Invalid credentials");
    user.password = undefined;
    const token = signToken({ id: user._id, role: user.role });
    return { user, token };
  }
}
