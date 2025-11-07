import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./ui/routes/auth.routes.js";
import studentRoutes from "./ui/routes/student.routes.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (req, res) =>
  res.json({ success: true, message: "System is healthy" })
);
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);

app.use((req, res) =>
  res.status(404).json({ success: false, message: "Not Found" })
);
app.use(errorHandler);
export default app;
