import { checkExistingUser, createNewUser, getUser } from "../Repositories/user/userRepositories.js";
import { compareHash, hashPassword } from "../Utils/hashUtils.js";
export const signUp = async (userData) => {
    try {
        const hashedPassword = await hashPassword(userData.password);
        const existingUser = await checkExistingUser(userData.email || userData.userName);
        if (existingUser) {
            return {
                status: 400,
                message: "user already exists",
                user: null,
            };
        }
        const addUser = await createNewUser({ ...userData, password: hashedPassword });
        if (addUser.status === 200) {
            addUser;
        }
        throw new Error("Cant create new user");
    }
    catch (error) {
        console.error(error);
        return {
            status: 400,
            message: "something went wrong",
            user: null,
        };
    }
};
export const singIn = async (userData) => {
    try {
        const user = await getUser(userData);
        if (user.status == 200 && user.user) {
            if (userData.password) {
                const checkPassword = await compareHash(userData.password, user.user.password);
                if (checkPassword) {
                    return {
                        user: user.user,
                        status: user.status,
                        message: 'login successful'
                    };
                }
                else {
                    return {
                        user: null,
                        status: 401,
                        message: 'wrong password'
                    };
                }
            }
        }
    }
    catch (error) { }
};
