import { Model, model, Schema } from "mongoose";
import { IUser } from "../../../interface.js";

const userSchema = new Schema<IUser>({
  userName: { type: String, required: [true, "User Name is required"], unique: true },
  email: { type: String, required: [true, "User Email is required"], unique: true },
  name: { type: String, required: [true, "Name is required"] },
  password: { type: String, required: [true, "User Name is required"] },
});

export const UserModel: Model<IUser> = model<IUser>("User", userSchema);
