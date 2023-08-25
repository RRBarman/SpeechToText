import express from "express";
import { getTask, getAllTasks } from "../controllers/task.js";
const router = express.Router();

router.get("/getTask/:id", getTask);
router.get("/gatAllTask", getAllTasks);

export default router;
