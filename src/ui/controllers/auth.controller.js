import { AuthService } from "../../bll/services/auth.service.js";
import {
  registerValidator,
  loginValidator,
} from "../../bll/validators/auth.validator.js";
import { sendSuccess } from "../../utils/response.js";

export const register = async (req, res, next) => {
  try {
    const { error } = registerValidator.validate(req.body);
    if (error) return next(error);

    const currentUser = req.user || null;
    const { user, token } = await AuthService.register(req.body, currentUser);
    sendSuccess(res, {
      status: 201,
      message: "User registered successfully",
      data: { user, token },
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { error } = loginValidator.validate(req.body);
    if (error) return next(error);

    const { user, token } = await AuthService.login(req.body);
    sendSuccess(res, { message: "Login successful", data: { user, token } });
  } catch (err) {
    next(err);
  }
};

export const getUserProfile = async (req, res, next) => {
  try {
    const user = await AuthService.getUserProfile(req.user.id, req.user.role);
    sendSuccess(res, {
      message: "Profile retrieved successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
