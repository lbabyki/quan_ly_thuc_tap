import dotenv from "dotenv";
dotenv.config();
import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./ui/routes/auth.routes.js";
import studentRoutes from "./ui/routes/student.routes.js";
import progressRoutes from "./ui/routes/progress.routes.js";
import internshipRoutes from "./ui/routes/internship.routes.js";
import lecturerRoutes from "./ui/routes/lecturer.routes.js";
import adminRoutes from "./ui/routes/admin.routes.js";
import companyRoutes from "./ui/routes/company.routes.js";
import notificationRoutes from "./ui/routes/notification.routes.js";
import errorHandler from "./middleware/error.middleware.js";
import { swaggerUi, specs } from "./config/swagger.js";
import { NotificationScheduler } from "./bll/services/notification.scheduler.js";

const app = express();

// Basic middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Static files
app.use("/uploads", express.static(process.env.UPLOAD_DIR || "uploads"));

// Health check
app.get("/v1/api/health", (req, res) =>
  res.json({
    success: true,
    message: "System is healthy",
    documentation: `${req.protocol}://${req.get("host")}/api-docs`,
  })
);

// API routes
app.use("/v1/api/auth", authRoutes);
app.use("/v1/api/students", studentRoutes);
app.use("/v1/api/progress", progressRoutes);
app.use("/v1/api/internships", internshipRoutes);
app.use("/v1/api/lecturer", lecturerRoutes);
app.use("/v1/api/admin", adminRoutes);
app.use("/v1/api/company", companyRoutes);
app.use("/v1/api/notifications", notificationRoutes);

// Swagger Documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    explorer: true,
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Internship Management API",
  })
);

// 404 handler - CUỐI CÙNG
app.use((req, res) => {
  console.log(`404 - Route not found: ${req.method} ${req.path}`);
  res.status(404).json({ success: false, message: "Not Found" });
});

// Error handler
app.use(errorHandler);

// Start notification scheduler
const scheduler = new NotificationScheduler();
scheduler.start();

export default app;
