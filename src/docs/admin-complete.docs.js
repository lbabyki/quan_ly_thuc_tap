// ===== ADMIN ROUTES =====
/**
 * @swagger
 * /v1/api/admin/dashboard:
 *   get:
 *     summary: Get admin dashboard statistics
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics retrieved
 */

/**
 * @swagger
 * /v1/api/admin/analytics:
 *   get:
 *     summary: Get system analytics
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Analytics data retrieved
 */

/**
 * @swagger
 * /v1/api/admin/users:
 *   get:
 *     summary: Get all users
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: ["all", "students", "lecturers", "companies"]
 *         example: "all"
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 10
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *   post:
 *     summary: Create new user
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
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
 *                 example: "New Student"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "newstudent@gmail.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *               role:
 *                 type: string
 *                 enum: ["student", "lecturer", "admin"]
 *                 example: "student"
 *               fullName:
 *                 type: string
 *                 example: "Nguyen Van B"
 *               department:
 *                 type: string
 *                 example: "Computer Science"
 *     responses:
 *       201:
 *         description: User created successfully
 */

/**
 * @swagger
 * /v1/api/admin/users/{id}:
 *   patch:
 *     summary: Update user
 *     tags: [Admin]
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
 *               fullName:
 *                 type: string
 *                 example: "Updated Name"
 *               status:
 *                 type: string
 *                 enum: ["pending", "approved", "rejected"]
 *                 example: "approved"
 *     responses:
 *       200:
 *         description: User updated successfully
 *   delete:
 *     summary: Delete user
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "60f7b3b3b3b3b3b3b3b3b3b3"
 *       - in: query
 *         name: userType
 *         required: true
 *         schema:
 *           type: string
 *           enum: ["student", "lecturer", "company"]
 *         example: "student"
 *     responses:
 *       200:
 *         description: User deleted successfully
 */

/**
 * @swagger
 * /v1/api/admin/users/{id}/reset-password:
 *   post:
 *     summary: Reset user password
 *     tags: [Admin]
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
 *               newPassword:
 *                 type: string
 *                 example: "newpassword123"
 *     responses:
 *       200:
 *         description: Password reset successfully
 */

/**
 * @swagger
 * /v1/api/admin/internships:
 *   post:
 *     summary: Create internship topic
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - companyName
 *               - title
 *               - description
 *             properties:
 *               companyName:
 *                 type: string
 *                 example: "Tech Corp"
 *               title:
 *                 type: string
 *                 example: "Software Developer Intern"
 *               description:
 *                 type: string
 *                 example: "Work on web development projects"
 *               requirements:
 *                 type: string
 *                 example: "Basic programming knowledge"
 *               maxStudents:
 *                 type: integer
 *                 example: 5
 *               duration:
 *                 type: string
 *                 example: "3 months"
 *               location:
 *                 type: string
 *                 example: "Ho Chi Minh City"
 *     responses:
 *       201:
 *         description: Internship created successfully
 */

/**
 * @swagger
 * /v1/api/admin/internships/{id}:
 *   patch:
 *     summary: Update internship
 *     tags: [Admin]
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
 *               title:
 *                 type: string
 *                 example: "Updated Internship Title"
 *               status:
 *                 type: string
 *                 enum: ["open", "closed", "pending"]
 *                 example: "open"
 *     responses:
 *       200:
 *         description: Internship updated successfully
 *   delete:
 *     summary: Delete internship
 *     tags: [Admin]
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
 *         description: Internship deleted successfully
 */

/**
 * @swagger
 * /v1/api/admin/internships/{id}/approve:
 *   post:
 *     summary: Approve internship suggestion
 *     tags: [Admin]
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
 *         description: Suggestion approved successfully
 */

/**
 * @swagger
 * /v1/api/admin/semesters:
 *   post:
 *     summary: Create semester
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - startDate
 *               - endDate
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Spring 2024"
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-02-01"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-05-31"
 *               description:
 *                 type: string
 *                 example: "Spring semester internship period"
 *     responses:
 *       201:
 *         description: Semester created successfully
 */

/**
 * @swagger
 * /v1/api/admin/semesters/{id}:
 *   patch:
 *     summary: Update semester
 *     tags: [Admin]
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
 *               name:
 *                 type: string
 *                 example: "Spring 2024 Updated"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-06-15"
 *     responses:
 *       200:
 *         description: Semester updated successfully
 */

/**
 * @swagger
 * /v1/api/admin/semesters/{id}/activate:
 *   post:
 *     summary: Activate semester
 *     tags: [Admin]
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
 *         description: Semester activated successfully
 */

/**
 * @swagger
 * /v1/api/admin/company-reports:
 *   get:
 *     summary: Get company reports
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Company reports retrieved
 */

/**
 * @swagger
 * /v1/api/admin/company-reports/{id}/approve:
 *   post:
 *     summary: Approve company report
 *     tags: [Admin]
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
 *         description: Company report approved
 */

/**
 * @swagger
 * /v1/api/admin/company-reports/{id}/reject:
 *   post:
 *     summary: Reject company report
 *     tags: [Admin]
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
 *               reason:
 *                 type: string
 *                 example: "Report needs more details"
 *     responses:
 *       200:
 *         description: Company report rejected
 */

// ===== NOTIFICATIONS =====
/**
 * @swagger
 * /v1/api/notifications/test-email:
 *   post:
 *     summary: Test email notification (Admin only)
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               to:
 *                 type: string
 *                 format: email
 *                 example: "test@gmail.com"
 *               subject:
 *                 type: string
 *                 example: "Test Email"
 *               message:
 *                 type: string
 *                 example: "This is a test email"
 *     responses:
 *       200:
 *         description: Test email sent successfully
 */

/**
 * @swagger
 * /v1/api/notifications/test-sms:
 *   post:
 *     summary: Test SMS notification (Admin only)
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               to:
 *                 type: string
 *                 example: "+84123456789"
 *               message:
 *                 type: string
 *                 example: "This is a test SMS"
 *     responses:
 *       200:
 *         description: Test SMS sent successfully
 */

/**
 * @swagger
 * /v1/api/notifications/bulk:
 *   post:
 *     summary: Send bulk notifications (Admin only)
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: ["email", "sms", "both"]
 *                 example: "email"
 *               recipients:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["student1@gmail.com", "student2@gmail.com"]
 *               subject:
 *                 type: string
 *                 example: "Important Announcement"
 *               message:
 *                 type: string
 *                 example: "Please submit your reports by deadline"
 *     responses:
 *       200:
 *         description: Bulk notifications sent successfully
 */

/**
 * @swagger
 * /v1/api/notifications/trigger-deadline-check:
 *   post:
 *     summary: Trigger deadline check (Admin only)
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Deadline check triggered successfully
 */

/**
 * @swagger
 * /v1/api/notifications/trigger-weekly-reminders:
 *   post:
 *     summary: Trigger weekly reminders (Admin only)
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Weekly reminders triggered successfully
 */