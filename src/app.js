import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

import healthRoutes from "./ui/routes/health.routes.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();

// Global middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api", healthRoutes);

// 404
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Not Found" });
});

// Error handler
app.use(errorHandler);

export default app;
