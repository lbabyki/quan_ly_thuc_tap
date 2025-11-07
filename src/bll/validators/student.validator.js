import Joi from "joi";
export const profileValidator = Joi.object({
  fullName: Joi.string().min(3).max(100).required(),
  studentCode: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().optional(),
  department: Joi.string().optional(),
  skills: Joi.array().items(Joi.string()).optional(),
  year: Joi.number().integer().optional(),
});
