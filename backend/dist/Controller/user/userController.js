import { signUp } from "../../Services/userServices.js";
export const registerUser = async (req, res) => {
    try {
        const { userName, password, email, name } = req.body;
        const register = await signUp({ userName, password, email, name });
    }
    catch (error) {
    }
};
