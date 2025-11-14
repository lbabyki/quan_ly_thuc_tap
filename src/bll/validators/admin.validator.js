import Joi from "joi";

export const createUserValidator = Joi.object({
  role: Joi.string()
    .valid("student", "lecturer", "company", "admin")
    .required(),

  // Common fields
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),

  // Student/Lecturer fields
  userName: Joi.string().when("role", {
    is: Joi.string().valid("student", "lecturer", "admin"),
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),
  fullName: Joi.string().optional(),
  department: Joi.string().optional(),
  phone: Joi.string().optional(),
  studentCode: Joi.string().when("role", {
    is: "student",
    then: Joi.optional(),
    otherwise: Joi.forbidden(),
  }),

  // Company fields
  companyName: Joi.string().when("role", {
    is: "company",
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),
  contactPerson: Joi.string().when("role", {
    is: "company",
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),
  contactEmail: Joi.string().when("role", {
    is: "company",
    then: Joi.string().email().required(),
    otherwise: Joi.forbidden(),
  }),
  contactPhone: Joi.string().optional(),
  address: Joi.string().optional(),
});

export const updateUserValidator = Joi.object({
  userName: Joi.string().optional(),
  fullName: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
  department: Joi.string().optional(),
  studentCode: Joi.string().optional(),
  status: Joi.string()
    .valid("pending", "approved", "rejected", "active", "inactive")
    .optional(),
  role: Joi.string()
    .valid("student", "lecturer", "company", "admin")
    .optional(),

  // Company fields
  companyName: Joi.string().optional(),
  contactPerson: Joi.string().optional(),
  contactEmail: Joi.string().email().optional(),
  contactPhone: Joi.string().optional(),
  address: Joi.string().optional(),

  // Password
  password: Joi.string().min(6).optional(),
});

export const semesterValidator = Joi.object({
  semester: Joi.string().required(), // "2024-1"
  startDate: Joi.date().required(),
  endDate: Joi.date().greater(Joi.ref("startDate")).required(),
  reportDeadlines: Joi.array()
    .items(
      Joi.object({
        type: Joi.string().valid("weekly", "monthly", "final").required(),
        deadline: Joi.date().required(),
      })
    )
    .optional(),
  defenseSchedule: Joi.object({
    startDate: Joi.date().optional(),
    endDate: Joi.date().optional(),
  }).optional(),
  isActive: Joi.boolean().default(false),
});

export const approveReportValidator = Joi.object({
  adminNotes: Joi.string().optional(),
});

export const rejectReportValidator = Joi.object({
  adminNotes: Joi.string().required(),
});
