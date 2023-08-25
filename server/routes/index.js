import express from "express";
import uploadRoutes from "./upload.js";
import tasksRoutes from "./task.js";
import authRoutes from "./auth.js";
import authMiddleware from "../middlewares/auth.js";
const route = express.Router();
route.use('/upload', authMiddleware, uploadRoutes); // uploadRoutes
route.use('/tasks', authMiddleware, tasksRoutes); // tasksRoutes
route.use('/auth', authRoutes); // authRoutes
export default route;

