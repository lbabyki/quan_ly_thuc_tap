/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin management endpoints
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
 *         name: role
 *         schema:
 *           type: string
 *           enum: ["student", "lecturer", "company"]
 *         description: Filter by user role
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: ["pending", "approved", "rejected"]
 *         description: Filter by user status
 *     responses:
 *       200:
 *         description: List of users
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
 *               - role
 *             properties:
 *               userName:
 *                 type: string
 *                 example: "New User"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "newuser@example.com"
 *               role:
 *                 type: string
 *                 enum: ["student", "lecturer", "company"]
 *                 example: "student"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: User created successfully

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
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ["pending", "approved", "rejected"]
 *                 example: "approved"
 *               userName:
 *                 type: string
 *                 example: "Updated Name"
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
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully

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
 *         description: User ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 example: "newpassword123"
 *                 description: "If not provided, defaults to '123456'"
 *     responses:
 *       200:
 *         description: Password reset successfully

/**
 * @swagger
 * /v1/api/admin/internships:
 *   post:
 *     summary: Create internship
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
 *     responses:
 *       201:
 *         description: Internship created successfully

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
 *         description: Internship ID
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
 *         description: Internship ID
 *     responses:
 *       200:
 *         description: Internship deleted successfully

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
 *         description: Internship suggestion ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - approve
 *             properties:
 *               approve:
 *                 type: boolean
 *                 example: true
 *               adminNotes:
 *                 type: string
 *                 example: "Approved with minor modifications"
 *     responses:
 *       200:
 *         description: Suggestion processed successfully

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
 *               - semester
 *               - startDate
 *               - endDate
 *             properties:
 *               semester:
 *                 type: string
 *                 example: "2024-2"
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-08-01"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-12-15"
 *               reportDeadlines:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                       enum: ["weekly", "monthly", "final"]
 *                     deadline:
 *                       type: string
 *                       format: date
 *     responses:
 *       201:
 *         description: Semester created successfully

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
 *         description: Semester ID
 *     responses:
 *       200:
 *         description: Semester updated successfully

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
 *         description: Semester ID
 *     responses:
 *       200:
 *         description: Semester activated successfully

/**
 * @swagger
 * /v1/api/admin/dashboard:
 *   get:
 *     summary: Get admin dashboard data
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data retrieved successfully

/**
 * @swagger
 * /v1/api/admin/analytics:
 *   get:
 *     summary: Get analytics data
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Analytics data retrieved successfully

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
 *         description: Company reports retrieved successfully

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
 *         description: Report ID
 *     responses:
 *       200:
 *         description: Report approved successfully

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
 *         description: Report ID
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
 *         description: Report rejected successfully
 */