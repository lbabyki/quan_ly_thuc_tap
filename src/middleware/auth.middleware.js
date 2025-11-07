import { verifyToken } from "../utils/token.js";
import { StudentRepository } from "../dal/repositories/student.repository.js";
export default function roleMiddleware(requiredRole = null) {
  return async (req, res, next) => {
    try {
      const auth = req.headers.authorization;
      if (!auth || !auth.startsWith("Bearer "))
        return res
          .status(401)
          .json({ success: false, message: "Missing token" });
      const token = auth.split(" ")[1];
      const payload = verifyToken(token);
      const repo = new StudentRepository();
      const user = await repo.findById(payload.id);
      if (!user)
        return res
          .status(401)
          .json({ success: false, message: "Invalid token" });
      req.user = user.toObject();
      delete req.user.password;
      if (requiredRole && req.user.role !== requiredRole)
        return res.status(403).json({ success: false, message: "Forbidden" });
      next();
    } catch (err) {
      return res
        .status(401)
        .json({
          success: false,
          message: "Invalid token",
          details: err.message,
        });
    }
  };
}
