import Joi from "joi";
export const profileValidator = Joi.object({
  fullName: Joi.string().min(3).max(100),
  studentCode: Joi.string().min(3).max(20),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().optional(),
  department: Joi.string().optional(),
  skills: Joi.array().items(Joi.string()).optional(),
  year: Joi.number().integer().optional(),
  _id: Joi.forbidden(),
});
