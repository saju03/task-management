import { checkExistingUser, createNewUser } from "../Repositories/user/userRepositorie.js";
import { hashPassword } from "../Utils/hashUtils.js";
export const signUp = async (userData) => {
    try {
        const hashedPassword = await hashPassword(userData.password);
        const existingUser = await checkExistingUser(userData.email || userData.userName);
        if (existingUser) {
            return {
                status: 400,
                message: "user already exists",
            };
        }
        const addUser = await createNewUser({ ...userData, password: hashedPassword });
    }
    catch (error) { }
};
