import Joi from "joi";

export const evaluationSchema = Joi.object({
  progressReportId: Joi.string().optional().allow(null, ""),
  scoreProcess: Joi.number().min(0).max(10).required(),
  scoreReport: Joi.number().min(0).max(10).required(),
  scoreDefense: Joi.number().min(0).max(10).required(),
  comments: Joi.string().optional().allow(""),
});

export const defenseScheduleSchema = Joi.object({
  _id: Joi.string().optional(),
  date: Joi.date().required(),
  location: Joi.string().required(),
  notes: Joi.string().optional().allow(""),
});
