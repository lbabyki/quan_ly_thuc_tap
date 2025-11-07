import Joi from "joi";

export const studentValidator = Joi.object({
  fullName: Joi.string().min(3).max(100).required(),
  studentCode: Joi.string().min(4).max(20).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().optional(),
  department: Joi.string().optional(),
  internshipCompany: Joi.string().optional(),
  cvUrl: Joi.string().uri().optional(),
  status: Joi.string().valid("pending", "approved", "rejected").optional(),
});
