import Joi from "joi";

export const defenseScheduleSchema = Joi.object({
  _id: Joi.string().optional(),
  date: Joi.date().required(),
  location: Joi.string().required(),
  notes: Joi.string().optional().allow(""),
});
export const addStudentToDefenseSchema = Joi.object({
  scheduleId: Joi.string().required(),
  studentId: Joi.string().required(),
});

export const finalizeDefenseSchema = Joi.object({
  scheduleId: Joi.string().required(),
  minutes: Joi.string().required(),
});
export const respondToProgressSchema = Joi.object({
  progressId: Joi.string().required(),
  lecturerId: Joi.string().required(),
  message: Joi.string().min(1).required(),
});
