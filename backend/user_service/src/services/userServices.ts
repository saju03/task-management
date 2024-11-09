import { error } from "console";
import { createUserReturnType, getUserReturnType, IUser, userData } from "../interface.js";
import { checkExistingUser, createNewUser, getUser } from "../Repositories/user/userRepositories.js";
import { compareHash, hashPassword } from "../Utils/hashUtils.js";

export const signUp = async (userData: IUser): Promise<createUserReturnType> => {
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
      addUser;
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

export const singIn = async (userData: userData):Promise<createUserReturnType> => {
  try {
    const user: getUserReturnType = await getUser(userData);
    if (user.status == 200 && user.user) {
      if (userData.password) {
        const checkPassword = await compareHash(userData.password, user.user.password);
        if (checkPassword) {
          return {
            user: user.user,
            status: user.status,
            message: "login successful",
          };
        } else {
          return {
            user: null,
            status: 401,
            message: "wrong password",
          };
        }
      }
    } else if (user.status == 404) {
      return {
        user: null,
        status: 404,
        message: "no user found sign up",
      };
    }
    throw new Error("cant sign in");
  } catch (error) {
    return {
      user: null,
      status: 500,
      message: "sign in error",
    };
  }
};
