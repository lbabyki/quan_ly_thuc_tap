/**
 * @swagger
 * tags:
 *   name: Lecturers
 *   description: Lecturer management endpoints
 */

/**
 * @swagger
 * /v1/api/lecturer/students:
 *   get:
 *     summary: Get assigned students
 *     tags: [Lecturers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of assigned students
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
 *                     $ref: '#/components/schemas/Student'

/**
 * @swagger
 * /v1/api/lecturer/evaluate/{studentId}:
 *   post:
 *     summary: Evaluate student
 *     tags: [Lecturers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Student ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - score
 *               - feedback
 *             properties:
 *               score:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 10
 *                 example: 8.5
 *               feedback:
 *                 type: string
 *                 example: "Excellent performance during internship"
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
 *         description: Evaluation created successfully

/**
 * @swagger
 * /v1/api/lecturer/evaluations:
 *   get:
 *     summary: Get my evaluations
 *     tags: [Lecturers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of evaluations
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
 *                     $ref: '#/components/schemas/Evaluation'

/**
 * @swagger
 * /v1/api/lecturer/defense-schedules:
 *   get:
 *     summary: Get defense schedules
 *     tags: [Lecturers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of defense schedules
 *   post:
 *     summary: Create defense schedule
 *     tags: [Lecturers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - time
 *               - location
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2024-12-20"
 *               time:
 *                 type: string
 *                 example: "09:00"
 *               location:
 *                 type: string
 *                 example: "Room 101"
 *               maxStudents:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       201:
 *         description: Defense schedule created

/**
 * @swagger
 * /v1/api/lecturer/defense-schedules/{scheduleId}/students:
 *   post:
 *     summary: Add student to defense schedule
 *     tags: [Lecturers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: scheduleId
 *         required: true
 *         schema:
 *           type: string
 *         description: Defense schedule ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - studentId
 *             properties:
 *               studentId:
 *                 type: string
 *                 example: "60f7b3b3b3b3b3b3b3b3b3b3"
 *     responses:
 *       200:
 *         description: Student added to defense schedule

/**
 * @swagger
 * /v1/api/lecturer/defense-schedules/{scheduleId}/finalize:
 *   post:
 *     summary: Finalize defense schedule
 *     tags: [Lecturers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: scheduleId
 *         required: true
 *         schema:
 *           type: string
 *         description: Defense schedule ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               minutes:
 *                 type: string
 *                 example: "Defense completed successfully. All students passed."
 *     responses:
 *       200:
 *         description: Defense schedule finalized
 */