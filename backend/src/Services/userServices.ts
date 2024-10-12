import { createUserReturnType, IUser } from "../interface.js";
import { checkExistingUser, createNewUser } from "../Repositories/user/userRepositories.js";
import { hashPassword } from "../Utils/hashUtils.js";

export const signUp = async (userData: IUser): Promise<createUserReturnType> =>{
  try {
    const hashedPassword: string = await hashPassword(userData.password);

    const existingUser = await checkExistingUser(userData.email || userData.userName);

    if (existingUser) {
      return {
        status: 400,
        message: "user already exists",
        user: null,
      };
    }
    const addUser: createUserReturnType = await createNewUser({ ...userData, password: hashedPassword });
    if (addUser.status === 200) {
     addUser
    }
    throw new Error("Cant create new user");
  } catch (error) {
    console.error(error);
    return {
      status: 400,
      message: "something went wrong",
      user: null,
    };
  }
};

