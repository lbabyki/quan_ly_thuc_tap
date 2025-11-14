/**
 * @swagger
 * tags:
 *   name: Progress
 *   description: Progress report management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ProgressReport:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "60f7b3b3b3b3b3b3b3b3b3b3"
 *         student:
 *           type: string
 *           example: "60f7b3b3b3b3b3b3b3b3b3b4"
 *         week:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: "First Week Progress Report"
 *         content:
 *           type: string
 *           example: "This week I learned about the company structure..."
 *         achievements:
 *           type: string
 *           example: "Completed project setup and environment configuration"
 *         challenges:
 *           type: string
 *           example: "Had some difficulties with the development environment"
 *         nextWeekPlan:
 *           type: string
 *           example: "Plan to start implementing the main features"
 *         status:
 *           type: string
 *           enum: [pending, approved, needs_revision]
 *           example: "pending"
 *         feedback:
 *           type: string
 *           example: "Good progress, keep it up!"
 *         reviewedBy:
 *           type: string
 *           example: "60f7b3b3b3b3b3b3b3b3b3b5"
 *         reviewedAt:
 *           type: string
 *           format: date-time
 *         attachments:
 *           type: array
 *           items:
 *             type: string
 *           example: ["/uploads/progress/file1.pdf"]
 *         createdAt:
 *           type: string
 *           format: date-time
 *
 *     CreateProgressRequest:
 *       type: object
 *       required:
 *         - week
 *         - title
 *         - content
 *       properties:
 *         week:
 *           type: integer
 *           minimum: 1
 *           maximum: 52
 *           example: 1
 *           description: Week number of the internship
 *         title:
 *           type: string
 *           minLength: 5
 *           maxLength: 200
 *           example: "First Week Progress Report"
 *         content:
 *           type: string
 *           minLength: 50
 *           example: "This week I learned about the company structure and started working on the project setup."
 *         achievements:
 *           type: string
 *           example: "Completed project setup and environment configuration"
 *         challenges:
 *           type: string
 *           example: "Had some difficulties with the development environment setup"
 *         nextWeekPlan:
 *           type: string
 *           example: "Plan to start implementing the main features"
 *
 *     UpdateStatusRequest:
 *       type: object
 *       required:
 *         - status
 *       properties:
 *         status:
 *           type: string
 *           enum: [approved, needs_revision]
 *           example: "approved"
 *         feedback:
 *           type: string
 *           example: "Good progress, keep it up!"
 */

/**
 * @swagger
 * /v1/api/progress:
 *   post:
 *     summary: Create progress report
 *     tags: [Progress]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - week
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Week 1 Progress Report"
 *               content:
 *                 type: string
 *                 example: "Completed initial setup and training"
 *               week:
 *                 type: integer
 *                 example: 1
 *               attachments:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: "Up to 5 attachment files"
 *     responses:
 *       201:
 *         description: Progress report created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Progress report submitted successfully"
 *                 data:
 *                   $ref: '#/components/schemas/ProgressReport'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       409:
 *         description: Report for this week already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /v1/api/progress/me:
 *   get:
 *     summary: Get my progress reports
 *     tags: [Progress]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Progress reports retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ProgressReport'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */

/**
 * @swagger
 * /v1/api/progress/me/week/{week}:
 *   get:
 *     summary: Get my progress report by week
 *     tags: [Progress]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: week
 *         required: true
 *         schema:
 *           type: integer
 *         description: Week number
 *         example: 1
 *     responses:
 *       200:
 *         description: Progress report found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/ProgressReport'
 *       404:
 *         description: No report found for this week
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */

/**
 * @swagger
 * /v1/api/progress/student/{studentId}:
 *   get:
 *     summary: Get progress reports by student (Lecturer only)
 *     tags: [Progress]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Progress reports retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ProgressReport'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         description: Access denied - Lecturer role required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /v1/api/progress/{progressId}/status:
 *   patch:
 *     summary: Update progress report status (Lecturer only)
 *     tags: [Progress]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: progressId
 *         required: true
 *         schema:
 *           type: string
 *         description: Progress report ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ["approved", "rejected", "needs_revision"]
 *                 example: "approved"
 *               feedback:
 *                 type: string
 *                 example: "Good progress, keep it up!"
 *     responses:
 *       200:
 *         description: Status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Progress report status updated"
 *                 data:
 *                   $ref: '#/components/schemas/ProgressReport'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         description: Access denied - Lecturer role required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
