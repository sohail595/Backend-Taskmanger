import { Router } from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  updateTaskStatus,
  getcompletedTask,
} from "../controllers/task.controller";
import { upload } from "../middlewares/upload";


const router = Router();

router.post("/", upload.single("image"), createTask); 
router.get("/", getTasks);
router.get ("/completed",getcompletedTask);
router.get("/:id", getTaskById);
router.put("/:id", upload.single("image"), updateTask);
router.delete("/:id", deleteTask);
router.patch("/status/:id", updateTaskStatus);


export default router;

