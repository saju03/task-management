import { Router } from "express";
import { addTask } from "../Controller/tasks/taskController.js";
const taskRoute = Router({ caseSensitive: true, strict: true });
taskRoute.post("/add-task", addTask);
export default taskRoute;
