import Joi from "joi";
export const progressValidator = Joi.object({
  week: Joi.number().integer().min(1).required(),
  title: Joi.string().required(),
  content: Joi.string().allow("").optional(),
});
