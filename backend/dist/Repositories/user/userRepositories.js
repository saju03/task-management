import { UserModel } from "../../Database/Models/userModel.js";
export const checkExistingUser = async (userDetail) => {
    try {
        // Check by email first
        const userByEmail = await UserModel.findOne({ email: userDetail });
        if (userByEmail)
            return true;
        // Check by username if email is not found
        const byUserName = await UserModel.findOne({ userName: userDetail });
        if (byUserName)
            return true;
        // If neither email nor username exists
        return false;
    }
    catch (error) {
        console.error(error);
        return false; // Return false in case of an error
    }
};
export const createNewUser = async (user) => {
    try {
        const newUser = await UserModel.create(user);
        if (newUser) {
            return {
                status: 200,
                user: {
                    userName: newUser.userName,
                    email: newUser.email,
                    name: newUser.name,
                },
                message: 'success',
            };
        }
        return {
            status: 400,
            user: null,
            message: "Something went wrong during user creation",
        };
    }
    catch (error) {
        console.error(error);
        return {
            status: 400,
            user: null,
            message: "An error occurred: Unable to create user",
        };
    }
};
