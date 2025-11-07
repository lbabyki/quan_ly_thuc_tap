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
    successResponse(res, { user, token }, 201);
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { error } = loginValidator.validate(req.body);
    if (error) return next(error);

    const { user, token } = await AuthService.login(req.body);
    sendSuccess(res, { user, token });
  } catch (err) {
    next(err);
  }
};
