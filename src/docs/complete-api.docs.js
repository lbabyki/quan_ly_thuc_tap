/**
 * @swagger
 * tags:
 *   - name: Health Check
 *     description: System health monitoring
 *   - name: Authentication
 *     description: User authentication and registration
 *   - name: Students
 *     description: Student profile management
 *   - name: Progress Reports
 *     description: Student progress tracking
 *   - name: Internships
 *     description: Internship management
 *   - name: Lecturer
 *     description: Lecturer operations
 *   - name: Company
 *     description: Company operations
 *   - name: Admin
 *     description: Administrative operations
 *   - name: Notifications
 *     description: Notification system
 */

/**
 * @swagger
 * /v1/api/health:
 *   get:
 *     summary: System health check
 *     tags: [Health Check]
 *     responses:
 *       200:
 *         description: System is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 */

// ===== AUTHENTICATION =====
/**
 * @swagger
 * /v1/api/auth/register:
 *   post:
 *     summary: Register new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - email
 *               - password
 *               - role
 *             properties:
 *               userName:
 *                 type: string
 *                 example: "Nguyen Van A"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "student@gmail.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *               role:
 *                 type: string
 *                 enum: ["student", "lecturer", "admin"]
 *                 example: "student"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /v1/api/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "student@gmail.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 token:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 */

// ===== STUDENTS =====
/**
 * @swagger
 * /v1/api/students/me:
 *   get:
 *     summary: Get my profile
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *   patch:
 *     summary: Update my profile
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: "Nguyen Van A Updated"
 *               phone:
 *                 type: string
 *                 example: "+84987654321"
 *               department:
 *                 type: string
 *                 example: "Computer Science"
 *     responses:
 *       200:
 *         description: Profile updated successfully
 */

/**
 * @swagger
 * /v1/api/students/upload-cv:
 *   post:
 *     summary: Upload CV file
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               cv:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: CV uploaded successfully
 */

/**
 * @swagger
 * /v1/api/students/{id}:
 *   get:
 *     summary: Get student by ID
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "60f7b3b3b3b3b3b3b3b3b3b3"
 *     responses:
 *       200:
 *         description: Student information retrieved
 */

// ===== PROGRESS REPORTS =====
/**
 * @swagger
 * /v1/api/progress:
 *   post:
 *     summary: Create progress report
 *     tags: [Progress Reports]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - week
 *               - title
 *               - content
 *               - reportType
 *             properties:
 *               week:
 *                 type: integer
 *                 example: 1
 *               title:
 *                 type: string
 *                 example: "Week 1 Progress Report"
 *               content:
 *                 type: string
 *                 example: "Completed initial setup and training"
 *               reportType:
 *                 type: string
 *                 enum: ["weekly", "monthly", "final"]
 *                 example: "weekly"
 *               attachments:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Progress report created successfully
 */

/**
 * @swagger
 * /v1/api/progress/me:
 *   get:
 *     summary: Get my progress reports
 *     tags: [Progress Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Progress reports retrieved successfully
 */

/**
 * @swagger
 * /v1/api/progress/me/week/{week}:
 *   get:
 *     summary: Get progress report by week
 *     tags: [Progress Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: week
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Weekly progress report retrieved
 */

/**
 * @swagger
 * /v1/api/progress/student/{studentId}:
 *   get:
 *     summary: Get student progress reports (Lecturer only)
 *     tags: [Progress Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         example: "60f7b3b3b3b3b3b3b3b3b3b3"
 *     responses:
 *       200:
 *         description: Student progress reports retrieved
 */

/**
 * @swagger
 * /v1/api/progress/{progressId}/status:
 *   patch:
 *     summary: Update progress report status (Lecturer only)
 *     tags: [Progress Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: progressId
 *         required: true
 *         schema:
 *           type: string
 *         example: "60f7b3b3b3b3b3b3b3b3b3b3"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ["reviewed", "approved", "rejected"]
 *                 example: "approved"
 *               feedback:
 *                 type: string
 *                 example: "Good progress, keep it up!"
 *     responses:
 *       200:
 *         description: Progress status updated successfully
 */

// ===== INTERNSHIPS =====
/**
 * @swagger
 * /v1/api/internships/available:
 *   get:
 *     summary: Get available internships
 *     tags: [Internships]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Available internships retrieved
 */

/**
 * @swagger
 * /v1/api/internships/register/{id}:
 *   post:
 *     summary: Register for internship
 *     tags: [Internships]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "60f7b3b3b3b3b3b3b3b3b3b3"
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               document:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Registered for internship successfully
 */

/**
 * @swagger
 * /v1/api/internships/suggest-topic:
 *   post:
 *     summary: Suggest internship topic
 *     tags: [Internships]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - companyName
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Mobile App Development"
 *               description:
 *                 type: string
 *                 example: "Develop mobile applications using React Native"
 *               companyName:
 *                 type: string
 *                 example: "Tech Solutions Ltd"
 *               requirements:
 *                 type: string
 *                 example: "Basic knowledge of JavaScript and React"
 *     responses:
 *       201:
 *         description: Topic suggestion submitted successfully
 */

/**
 * @swagger
 * /v1/api/internships/me:
 *   get:
 *     summary: Get my internship information
 *     tags: [Internships]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Internship information retrieved
 */

/**
 * @swagger
 * /v1/api/internships/cancel:
 *   delete:
 *     summary: Cancel internship registration
 *     tags: [Internships]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Internship registration cancelled successfully
 */

/**
 * @swagger
 * /v1/api/internships/all:
 *   get:
 *     summary: Get all internships (Admin only)
 *     tags: [Internships]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All internships retrieved
 */

/**
 * @swagger
 * /v1/api/internships/suggestions:
 *   get:
 *     summary: Get internship suggestions (Admin only)
 *     tags: [Internships]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Internship suggestions retrieved
 */

/**
 * @swagger
 * /v1/api/internships/suggestions/{id}:
 *   patch:
 *     summary: Review internship suggestion (Admin only)
 *     tags: [Internships]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "60f7b3b3b3b3b3b3b3b3b3b3"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ["approved", "rejected"]
 *                 example: "approved"
 *               feedback:
 *                 type: string
 *                 example: "Good suggestion, approved"
 *     responses:
 *       200:
 *         description: Suggestion reviewed successfully
 */

// ===== LECTURER =====
/**
 * @swagger
 * /v1/api/lecturer/students:
 *   get:
 *     summary: Get assigned students
 *     tags: [Lecturer]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Assigned students retrieved
 */

/**
 * @swagger
 * /v1/api/lecturer/evaluate/{studentId}:
 *   post:
 *     summary: Evaluate student
 *     tags: [Lecturer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         example: "60f7b3b3b3b3b3b3b3b3b3b3"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               score:
 *                 type: number
 *                 example: 8.5
 *               feedback:
 *                 type: string
 *                 example: "Excellent performance"
 *               criteria:
 *                 type: object
 *                 properties:
 *                   technical:
 *                     type: number
 *                     example: 8
 *                   communication:
 *                     type: number
 *                     example: 9
 *                   teamwork:
 *                     type: number
 *                     example: 8
 *     responses:
 *       201:
 *         description: Student evaluated successfully
 */

/**
 * @swagger
 * /v1/api/lecturer/evaluations:
 *   get:
 *     summary: Get my evaluations
 *     tags: [Lecturer]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Evaluations retrieved successfully
 */

/**
 * @swagger
 * /v1/api/lecturer/defense-schedules:
 *   get:
 *     summary: Get defense schedules
 *     tags: [Lecturer]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Defense schedules retrieved
 *   post:
 *     summary: Create defense schedule
 *     tags: [Lecturer]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2024-06-15"
 *               time:
 *                 type: string
 *                 example: "09:00"
 *               location:
 *                 type: string
 *                 example: "Room A101"
 *     responses:
 *       201:
 *         description: Defense schedule created successfully
 */

/**
 * @swagger
 * /v1/api/lecturer/defense-schedules/{scheduleId}/students:
 *   post:
 *     summary: Add student to defense schedule
 *     tags: [Lecturer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: scheduleId
 *         required: true
 *         schema:
 *           type: string
 *         example: "60f7b3b3b3b3b3b3b3b3b3b3"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *                 example: "60f7b3b3b3b3b3b3b3b3b3b3"
 *     responses:
 *       200:
 *         description: Student added to defense schedule
 */

/**
 * @swagger
 * /v1/api/lecturer/defense-schedules/{scheduleId}/finalize:
 *   post:
 *     summary: Finalize defense schedule
 *     tags: [Lecturer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: scheduleId
 *         required: true
 *         schema:
 *           type: string
 *         example: "60f7b3b3b3b3b3b3b3b3b3b3"
 *     responses:
 *       200:
 *         description: Defense schedule finalized
 */

// ===== COMPANY =====
/**
 * @swagger
 * /v1/api/company/register:
 *   post:
 *     summary: Register company
 *     tags: [Company]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - companyName
 *               - contactEmail
 *               - contactPerson
 *               - password
 *             properties:
 *               companyName:
 *                 type: string
 *                 example: "Tech Corp Ltd"
 *               contactEmail:
 *                 type: string
 *                 format: email
 *                 example: "hr@techcorp.com"
 *               contactPerson:
 *                 type: string
 *                 example: "John Doe"
 *               contactPhone:
 *                 type: string
 *                 example: "+84123456789"
 *               address:
 *                 type: string
 *                 example: "123 Tech Street, Ho Chi Minh City"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Company registered successfully
 */

/**
 * @swagger
 * /v1/api/company/login:
 *   post:
 *     summary: Company login
 *     tags: [Company]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "hr@techcorp.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Company login successful
 */

/**
 * @swagger
 * /v1/api/company/me:
 *   get:
 *     summary: Get company profile
 *     tags: [Company]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Company profile retrieved
 *   patch:
 *     summary: Update company profile
 *     tags: [Company]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyName:
 *                 type: string
 *                 example: "Tech Corp Ltd Updated"
 *               contactPhone:
 *                 type: string
 *                 example: "+84987654321"
 *               address:
 *                 type: string
 *                 example: "456 New Tech Street, Ho Chi Minh City"
 *     responses:
 *       200:
 *         description: Company profile updated
 */

/**
 * @swagger
 * /v1/api/company/students:
 *   get:
 *     summary: Get company's intern students
 *     tags: [Company]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Intern students retrieved
 */

/**
 * @swagger
 * /v1/api/company/students/{id}/confirm:
 *   post:
 *     summary: Confirm student internship
 *     tags: [Company]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "60f7b3b3b3b3b3b3b3b3b3b3"
 *     responses:
 *       200:
 *         description: Student confirmed successfully
 */

/**
 * @swagger
 * /v1/api/company/students/{id}/evaluate:
 *   post:
 *     summary: Evaluate student (Company)
 *     tags: [Company]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "60f7b3b3b3b3b3b3b3b3b3b3"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               score:
 *                 type: number
 *                 example: 8.5
 *               feedback:
 *                 type: string
 *                 example: "Great performance during internship"
 *               criteria:
 *                 type: object
 *                 properties:
 *                   workQuality:
 *                     type: number
 *                     example: 9
 *                   punctuality:
 *                     type: number
 *                     example: 8
 *                   teamwork:
 *                     type: number
 *                     example: 8
 *     responses:
 *       201:
 *         description: Student evaluated successfully
 */

/**
 * @swagger
 * /v1/api/company/reports:
 *   get:
 *     summary: Get company reports
 *     tags: [Company]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Company reports retrieved
 *   post:
 *     summary: Create company report
 *     tags: [Company]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Monthly Internship Report"
 *               content:
 *                 type: string
 *                 example: "Summary of intern activities and performance"
 *               students:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["60f7b3b3b3b3b3b3b3b3b3b3"]
 *     responses:
 *       201:
 *         description: Company report created successfully
 */