import { signUp, singIn } from "../services/userServices.js";
import { getToken } from "../../Utils/tokenUtils.js";
import { CustomError } from "../../error.js";
export const registerUser = async (req, res, next) => {
    try {
        debugger;
        const { userName, password, email, name } = req.body;
        if (!userName || !email || !password) {
            const error = new Error("Missing required fields: userName, email, and password are required.");
            return next(error);
        }
        const register = await signUp({ userName, password, email, name });
        if (register.status == 200 && register.user) {
            const tokenCredentials = { name: register.user.name, type: 1, permission: 1 };
            const token = await getToken(tokenCredentials);
            res.cookie("auth", token.accessToken, {
                maxAge: 9 * 60 * 1000,
                httpOnly: true, // Optional: restricts access to HTTP(S) requests only
                secure: true, // Optional: send cookie over HTTPS only (recommended for production)
                sameSite: "strict", // Optional: controls cross-site request behavior
            });
            res.cookie("refresh", token.refreshToken, {
                maxAge: 15 * 60 * 1000,
                httpOnly: true,
                secure: true,
                sameSite: true,
            });
            res.json({ status: true }).status(200);
        }
        res.json({ message: "user registration failed" }).status(400);
    }
    catch (error) {
        const customError = new CustomError("User registration failed", 400);
        next(customError);
    }
};
export const userSignIn = async (req, res, next) => {
    try {
        const { userName, email, password } = req.body;
        if (!userName || !email || !password) {
            const error = new CustomError("Missing required fields: userName, email, and password are required.", 400);
            return next(error);
        }
        const signInUser = await singIn({ userName: userName, email: email, password: password });
        if (signInUser.status == 200) {
            const tokenCredentials = { name: signInUser.user?.name, type: 1, permission: 1 };
            const token = await getToken(tokenCredentials);
            res.cookie("auth", token.accessToken, {
                maxAge: 9 * 60 * 1000,
                httpOnly: true, // Optional: restricts access to HTTP(S) requests only
                secure: true, // Optional: send cookie over HTTPS only (recommended for production)
                sameSite: "strict", // Optional: controls cross-site request behavior
            });
            res.cookie("refresh", token.refreshToken, {
                maxAge: 15 * 60 * 1000,
                httpOnly: true,
                secure: true,
                sameSite: true,
            });
            res.json({ status: true }).status(200);
        }
        throw new CustomError(signInUser.message, signInUser.status);
    }
    catch (error) {
        next(error);
    }
};
