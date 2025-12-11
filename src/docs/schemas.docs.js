/**
 * @swagger
 * components:
 *   schemas:
 *     Success:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Operation successful"
 *         data:
 *           type: object
 *
 *     Error:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "Error message"
 *         error:
 *           type: string
 *           example: "Detailed error information"
 *
 *     LoginResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Login successful"
 *         data:
 *           type: object
 *           properties:
 *             user:
 *               $ref: '#/components/schemas/User'
 *             token:
 *               type: string
 *               example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "60f7b3b3b3b3b3b3b3b3b3b3"
 *         userName:
 *           type: string
 *           example: "Nguyen Van A"
 *         email:
 *           type: string
 *           format: email
 *           example: "student@example.com"
 *         role:
 *           type: string
 *           enum: ["student", "lecturer", "company", "admin"]
 *           example: "student"
 *         status:
 *           type: string
 *           enum: ["pending", "approved", "rejected"]
 *           example: "approved"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T00:00:00.000Z"
 *
 *     Student:
 *       allOf:
 *         - $ref: '#/components/schemas/User'
 *         - type: object
 *           properties:
 *             fullName:
 *               type: string
 *               example: "Nguyen Van A"
 *             studentCode:
 *               type: string
 *               example: "SV001"
 *             department:
 *               type: string
 *               example: "Computer Science"
 *             phone:
 *               type: string
 *               example: "+84123456789"
 *             internshipCompany:
 *               type: string
 *               example: "60f7b3b3b3b3b3b3b3b3b3b3"
 *             assignedLecturer:
 *               type: string
 *               example: "60f7b3b3b3b3b3b3b3b3b3b3"
 *             cvUrl:
 *               type: string
 *               example: "http://localhost:5000/uploads/cv_student1.pdf"
 *
 *     Internship:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "60f7b3b3b3b3b3b3b3b3b3b3"
 *         companyName:
 *           type: string
 *           example: "Tech Corp"
 *         title:
 *           type: string
 *           example: "Software Developer Intern"
 *         description:
 *           type: string
 *           example: "Work on web development projects"
 *         requirements:
 *           type: string
 *           example: "Basic programming knowledge"
 *         maxStudents:
 *           type: integer
 *           example: 5
 *         students:
 *           type: array
 *           items:
 *             type: string
 *           example: ["60f7b3b3b3b3b3b3b3b3b3b3"]
 *         status:
 *           type: string
 *           enum: ["pending", "approved", "rejected", "open", "closed"]
 *           example: "open"
 *         isSuggested:
 *           type: boolean
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T00:00:00.000Z"
 *
 *     ProgressReport:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "60f7b3b3b3b3b3b3b3b3b3b3"
 *         student:
 *           type: string
 *           example: "60f7b3b3b3b3b3b3b3b3b3b3"
 *         internship:
 *           type: string
 *           example: "60f7b3b3b3b3b3b3b3b3b3b3"
 *         week:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: "Week 1 Progress Report"
 *         content:
 *           type: string
 *           example: "Completed initial setup and training"
 *         attachments:
 *           type: array
 *           items:
 *             type: string
 *           example: ["report_week1.pdf", "screenshot.png"]
 *         status:
 *           type: string
 *           enum: ["draft", "submitted", "reviewed", "approved"]
 *           example: "submitted"
 *         submittedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T00:00:00.000Z"
 *         feedbacks:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               lecturer:
 *                 type: string
 *                 example: "60f7b3b3b3b3b3b3b3b3b3b3"
 *               message:
 *                 type: string
 *                 example: "Good progress, keep it up!"
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-01-01T00:00:00.000Z"
 *
 *     Evaluation:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "60f7b3b3b3b3b3b3b3b3b3b3"
 *         student:
 *           type: string
 *           example: "60f7b3b3b3b3b3b3b3b3b3b3"
 *         evaluator:
 *           type: string
 *           example: "60f7b3b3b3b3b3b3b3b3b3b3"
 *         evaluatorType:
 *           type: string
 *           enum: ["lecturer", "company"]
 *           example: "lecturer"
 *         score:
 *           type: number
 *           example: 8.5
 *         feedback:
 *           type: string
 *           example: "Excellent performance"
 *         criteria:
 *           type: object
 *           properties:
 *             technical:
 *               type: number
 *               example: 8
 *             communication:
 *               type: number
 *               example: 9
 *             teamwork:
 *               type: number
 *               example: 8
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T00:00:00.000Z"
 *     Company:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "60f7b3b3b3b3b3b3b3b3b3b3"
 *         companyName:
 *           type: string
 *           example: "Tech Corp Ltd"
 *         contactEmail:
 *           type: string
 *           format: email
 *           example: "hr@techcorp.com"
 *         contactPerson:
 *           type: string
 *           example: "John Doe"
 *         contactPhone:
 *           type: string
 *           example: "+84123456789"
 *         address:
 *           type: string
 *           example: "123 Tech Street, Ho Chi Minh City"
 *         role:
 *           type: string
 *           example: "company"
 *         status:
 *           type: string
 *           enum: ["pending", "approved", "rejected"]
 *           example: "approved"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T00:00:00.000Z"
 */
