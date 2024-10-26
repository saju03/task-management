import { model, Schema } from "mongoose";
const userSchema = new Schema({
    userName: { type: String, required: [true, 'User Name is required'], unique: true },
    email: { type: String, required: [true, 'User Email is required'], unique: true },
    name: { type: String, required: [true, 'Name is required'] },
    password: { type: String, required: [true, 'User Name is required'] },
});
export const UserModel = model('User', userSchema);
