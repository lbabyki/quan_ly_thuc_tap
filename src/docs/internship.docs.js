/**
 * @swagger
 * tags:
 *   name: Internships
 *   description: Internship management endpoints
 */

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
 *         description: List of available internships
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
 *                     $ref: '#/components/schemas/Internship'
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
 *         description: Internship ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               document:
 *                 type: string
 *                 format: binary
 *                 description: Registration document
 *     responses:
 *       201:
 *         description: Registration successful
 */

/**
 * @swagger
 * /v1/api/internships/suggest-topic:
 *   post:
 *     summary: Suggest new internship topic
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
 *               - company
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Frontend Developer Intern"
 *               description:
 *                 type: string
 *                 example: "Work on React projects"
 *               company:
 *                 type: string
 *                 example: "60f7b3b3b3b3b3b3b3b3b3b3"
 *               requirements:
 *                 type: string
 *                 example: "Basic knowledge of JavaScript"
 *     responses:
 *       201:
 *         description: Suggestion submitted successfully
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
 *         description: Suggestions retrieved
 */

/**
 * @swagger
 * /v1/api/internships/suggestions/{id}:
 *   patch:
 *     summary: Approve/reject suggestion (Admin only)
 *     tags: [Internships]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Suggestion ID
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
 *                 enum: ["approved", "rejected"]
 *                 example: "approved"
 *     responses:
 *       200:
 *         description: Suggestion status updated
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
 *         description: Registration cancelled successfully
 */
