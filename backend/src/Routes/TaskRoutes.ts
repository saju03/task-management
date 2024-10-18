import { Router } from "express";

const taskRoute:Router = Router({ caseSensitive: true, strict: true });

taskRoute.post("/add-task")

export default taskRoute ;
