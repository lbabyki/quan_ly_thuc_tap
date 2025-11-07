import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

import studentRoutes from "./ui/routes/student.routes.js";
import healthroutes from "./ui/routes/health.routes.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/students", studentRoutes);
app.use("/api", healthroutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Not Found" });
});

app.use(errorHandler);

export default app;
