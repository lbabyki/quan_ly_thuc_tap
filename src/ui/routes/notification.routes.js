import express from "express";
import { NotificationController } from "../controllers/notification.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = express.Router();

// Admin only routes
router.post(
  "/test-email",
  authMiddleware("admin"),
  NotificationController.testEmail
);
router.post(
  "/test-sms",
  authMiddleware("admin"),
  NotificationController.testSMS
);
router.post(
  "/bulk",
  authMiddleware("admin"),
  NotificationController.sendBulkNotification
);
router.post(
  "/trigger-deadline-check",
  authMiddleware("admin"),
  NotificationController.triggerDeadlineCheck
);
router.post(
  "/trigger-weekly-reminders",
  authMiddleware("admin"),
  NotificationController.triggerWeeklyReminders
);

export default router;
