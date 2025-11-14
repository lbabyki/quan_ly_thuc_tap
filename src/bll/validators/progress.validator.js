import Joi from "joi";

export const progressValidator = Joi.object({
  week: Joi.number().integer().min(1).max(52).required(),
  title: Joi.string().min(5).max(200).required(),
  content: Joi.string().min(10).required(),
  reportType: Joi.string()
    .valid("weekly", "monthly", "final")
    .default("weekly"),
  internship: Joi.string().optional(), // Có thể lấy từ user profile
});

export const statusUpdateValidator = Joi.object({
  status: Joi.string().valid("submitted", "reviewed", "approved").required(),
});
