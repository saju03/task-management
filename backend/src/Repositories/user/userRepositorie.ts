import { UserModel } from "../../Database/Models/userModel.js";
import { IUser } from "../../interface.js";

export const checkExistingUser = async (userDetail: string): Promise<boolean> => {
  try {
    // Check by email first
    const userByEmail = await UserModel.findOne({ email: userDetail });
    if (userByEmail) return true;

    // Check by username if email is not found
    const byUserName = await UserModel.findOne({ userName: userDetail });
    if (byUserName) return true;

    // If neither email nor username exists
    return false;
  } catch (error) {
    console.error(error);
    return false; // Return false in case of an error
  }
};

export const createNewUser = async (user: IUser) => {
  try {
    const newUser = await UserModel.create(user);
    const { password, ...userWithoutPassword } = newUser.toObject();

    console.log(userWithoutPassword);

    if (newUser) {
      return {
        status: 200,
        user: { userWithoutPassword },
      };
    }
    return {
      status: 400,
      user: null,
      message: "something went wrong user creation",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 400,
      message: "something went wrong can`t create user",
    };
  }
};
