/**
 * @swagger
 * tags:
 *   name: Companies
 *   description: Company management endpoints
 */

/**
 * @swagger
 * /v1/api/company/register:
 *   post:
 *     summary: Register new company
 *     tags: [Companies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - companyName
 *               - contactEmail
 *               - password
 *               - contactPerson
 *             properties:
 *               companyName:
 *                 type: string
 *                 example: "Tech Corp Ltd"
 *               contactEmail:
 *                 type: string
 *                 format: email
 *                 example: "hr@techcorp.com"
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: "123456"
 *               contactPerson:
 *                 type: string
 *                 example: "John Doe"
 *               contactPhone:
 *                 type: string
 *                 example: "+84123456789"
 *               address:
 *                 type: string
 *                 example: "123 Tech Street, Ho Chi Minh City"
 *     responses:
 *       201:
 *         description: Company registered successfully
 *       400:
 *         description: Validation error or email already exists
 */

/**
 * @swagger
 * /v1/api/company/login:
 *   post:
 *     summary: Company login
 *     tags: [Companies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - contactEmail
 *               - password
 *             properties:
 *               contactEmail:
 *                 type: string
 *                 format: email
 *                 example: "hr@techcorp.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /v1/api/company/me:
 *   get:
 *     summary: Get company profile
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Company profile retrieved
 *   patch:
 *     summary: Update company profile
 *     tags: [Companies]
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
 *                 example: "Tech Corp Ltd"
 *               contactPerson:
 *                 type: string
 *                 example: "Jane Smith"
 *               contactPhone:
 *                 type: string
 *                 example: "+84987654321"
 *               address:
 *                 type: string
 *                 example: "456 New Tech Avenue"
 *     responses:
 *       200:
 *         description: Profile updated successfully
 */

/**
 * @swagger
 * /v1/api/company/students:
 *   get:
 *     summary: Get assigned students
 *     tags: [Companies]
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
 */

/**
 * @swagger
 * /v1/api/company/students/{id}/confirm:
 *   post:
 *     summary: Confirm student assignment
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 *             properties:
 *               confirmed:
 *                 type: boolean
 *                 example: true
 *               notes:
 *                 type: string
 *                 example: "Student confirmed for internship position"
 *     responses:
 *       200:
 *         description: Student confirmation updated
 */

/**
 * @swagger
 * /v1/api/company/students/{id}/evaluate:
 *   post:
 *     summary: Evaluate student
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 *               - overallScore
 *               - feedback
 *             properties:
 *               overallScore:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 10
 *                 example: 8.5
 *               feedback:
 *                 type: string
 *                 example: "Excellent performance and attitude"
 *               skills:
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
 *                   problemSolving:
 *                     type: number
 *                     example: 7
 *     responses:
 *       201:
 *         description: Evaluation submitted successfully
 */

/**
 * @swagger
 * /v1/api/company/reports:
 *   get:
 *     summary: Get company reports
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of company reports
 *   post:
 *     summary: Create company report
 *     tags: [Companies]
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
 *               - summary
 *             properties:
 *               semester:
 *                 type: string
 *                 example: "2024-2"
 *               summary:
 *                 type: string
 *                 example: "Overall internship program summary"
 *               studentPerformance:
 *                 type: string
 *                 example: "Students showed excellent performance"
 *               recommendations:
 *                 type: string
 *                 example: "Recommend continuing partnership"
 *     responses:
 *       201:
 *         description: Report created successfully
 */
