import express from "express";
import cors from "cors";
import taskRoutes from "./routes/task.routes";
import path from "path";

const app = express();

app.use(cors());
// app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
// ⚠️ JSON parser (for non-form-data routes)
app.use(express.json());

// ⚠️ URL-encoded parser (IMPORTANT)
app.use(express.urlencoded({ extended: true }));

app.use("/api/tasks", taskRoutes);

export default app;
