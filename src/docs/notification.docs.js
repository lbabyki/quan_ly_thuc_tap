/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Notification management endpoints (Admin only)
 */

/**
 * @swagger
 * /v1/api/notifications/test-email:
 *   post:
 *     summary: Test email sending
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - to
 *               - subject
 *               - content
 *             properties:
 *               to:
 *                 type: string
 *                 format: email
 *                 example: "test@example.com"
 *               subject:
 *                 type: string
 *                 example: "Test Email"
 *               content:
 *                 type: string
 *                 example: "This is a test email"
 *     responses:
 *       200:
 *         description: Test email sent successfully
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
 *                   example: "Test email sent successfully"
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         description: Access denied - Admin role required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Email sending failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Failed to send email"
 *                 error:
 *                   type: string
 *                   example: "SMTP connection failed"
 */

/**
 * @swagger
 * /v1/api/notifications/test-sms:
 *   post:
 *     summary: Test SMS sending
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - to
 *               - message
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
 *                   example: "Test SMS sent successfully"
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         description: Access denied - Admin role required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: SMS sending failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Failed to send SMS"
 *                 error:
 *                   type: string
 *                   example: "Twilio authentication failed"
 */

/**
 * @swagger
 * /v1/api/notifications/bulk:
 *   post:
 *     summary: Send bulk notifications
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - recipients
 *               - subject
 *               - content
 *               - type
 *             properties:
 *               recipients:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["user1@example.com", "user2@example.com"]
 *               subject:
 *                 type: string
 *                 example: "Important Announcement"
 *               content:
 *                 type: string
 *                 example: "This is an important announcement for all users"
 *               type:
 *                 type: string
 *                 enum: ["email", "sms"]
 *                 example: "email"
 *     responses:
 *       200:
 *         description: Bulk notifications sent successfully
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
 *                   example: "Bulk notification sent to 25 users"
 *                 data:
 *                   type: object
 *                   properties:
 *                     sentCount:
 *                       type: integer
 *                       example: 25
 *                     targetRole:
 *                       type: string
 *                       example: "student"
 *                     method:
 *                       type: string
 *                       example: "email"
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         description: Access denied - Admin role required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /v1/api/notifications/trigger-deadline-check:
 *   post:
 *     summary: Trigger deadline check manually
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Deadline check triggered successfully
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
 *                   example: "Deadline check triggered successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     studentsNotified:
 *                       type: integer
 *                       example: 15
 *                     deadlinesChecked:
 *                       type: integer
 *                       example: 3
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         description: Access denied - Admin role required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Deadline check failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /v1/api/notifications/trigger-weekly-reminders:
 *   post:
 *     summary: Trigger weekly reminders manually
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Weekly reminders sent successfully
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
 *                   example: "Weekly reminders sent successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     studentsNotified:
 *                       type: integer
 *                       example: 30
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         description: Access denied - Admin role required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Weekly reminders failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
