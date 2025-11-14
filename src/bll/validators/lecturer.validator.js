import Joi from "joi";

export const defenseScheduleSchema = Joi.object({
  _id: Joi.string().optional(),
  date: Joi.date().required(),
  location: Joi.string().required(),
  notes: Joi.string().optional().allow(""),
});
