import express from "express";
import { healthController } from "../controllers/health.controller.js";

const router = express.Router();

// GET /api/health
router.get("/health", healthController);

export default router;
