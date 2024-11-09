import { Router } from "express";
import { registerUser } from "../controller/userController.js";
const route = Router({ caseSensitive: true, strict: true });
route.post("/register-user", registerUser);
export default route;
