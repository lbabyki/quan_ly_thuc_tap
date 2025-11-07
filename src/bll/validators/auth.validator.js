import Joi from "joi";
export const registerValidator = Joi.object({
  fullName: Joi.string().min(3).required(),
  studentCode: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
export const loginValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
