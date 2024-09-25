import { Router } from "express";
import { registerUser } from "../Controller/user/userController.js";

const route:Router = Router({ caseSensitive: true, strict: true });

route.post("/register-user",registerUser)

export default route ;
