import { sendSuccess, sendError } from "../../utils/response.js";
import { AuthService } from "../../bll/services/auth.service.js";
import {
  registerValidator,
  loginValidator,
} from "../../bll/validators/auth.validator.js";

const authService = new AuthService();
export class AuthController {
  static async register(req, res) {
    try {
      const { error } = registerValidator.validate(req.body);
      if (error)
        return sendError(res, {
          status: 400,
          message: error.details[0].message,
        });
      const result = await authService.register(req.body);
      return sendSuccess(res, {
        status: 201,
        message: "Registered",
        data: result,
      });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  static async login(req, res) {
    try {
      const { error } = loginValidator.validate(req.body);
      if (error)
        return sendError(res, {
          status: 400,
          message: error.details[0].message,
        });
      const result = await authService.login(req.body);
      return sendSuccess(res, { message: "Logged in", data: result });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  static async profile(req, res) {
    try {
      // req.user set by auth middleware
      const user = req.user;
      return sendSuccess(res, { data: user });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }
}
