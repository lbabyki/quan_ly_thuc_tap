// src/bll/validators/internship.validator.js
import Joi from "joi";

export const registerValidator = Joi.object({
  internshipId: Joi.string().required(), // id của internship để đăng ký
});

export const suggestValidator = Joi.object({
  suggestedTitle: Joi.string().min(3).required(),
  suggestedDescription: Joi.string().min(10).required(),
  companyName: Joi.string().allow("", null),
  position: Joi.string().allow("", null),
});
