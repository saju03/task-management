import { UserModel } from "../../Database/Models/User/userModel.js";
import { dbUserType, createUserReturnType, IUser, getUserReturnType, userData } from "../../interface.js";

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

export const createNewUser = async (user: IUser): Promise<createUserReturnType> => {
  try {
    const newUser: dbUserType = await UserModel.create(user);

    if (newUser) {
      return {
        status: 200,
        user: {
          userName: newUser.userName,
          email: newUser.email,
          name: newUser.name,
        } as IUser,
        message: "success",
      };
    }

    return {
      status: 400,
      user: null,
      message: "Something went wrong during user creation",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 400,
      user: null,
      message: "An error occurred: Unable to create user",
    };
  }
};
export const getUser = async (userData: userData): Promise<getUserReturnType> => {
  return new Promise((resolve, reject) => {
    if (userData.email) {
      UserModel.findOne({ email: userData.email })
        .then((data: dbUserType | null) => {
          if (data) {
            resolve({
              user: {
                userName: data.userName,
                email: data.email,
                name: data.name,
                password: data.password,
              },
              status: 200,
            });
          } else {
            reject({ status: 404, message: "No user exists with this email" });
          }
        })
        .catch(() => reject({ status: 500, message: "Error finding user by email" }));
    } else if (userData.userName) {
      UserModel.findOne({ userName: userData.userName })
        .then((data: dbUserType | null) => {
          if (data) {
            resolve({
              user: {
                userName: data.userName,
                email: data.email,
                name: data.name,
                password: data.password,
              },
              status: 200,
            });
          } else {
            reject({ status: 404, message: "No user exists with this username" });
          }
        })
        .catch(() => reject({ status: 500, message: "Error finding user by username" }));
    } else {
      reject({ status: 400, message: "No search criteria provided" });
    }
  });
};
