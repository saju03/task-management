import mongoose from "mongoose";
import dotenv from 'dotenv';
import { CustomError } from "../error.js";

dotenv.config();

const initDB = async(): Promise<void> =>{
    try {
     await mongoose.connect("mongodb://localhost:27017/task_manager") 
     console.log('db connected');
    } catch (error) {
        console.error(error)
        throw new CustomError('Database Connection Failed',500)
}

}




export default initDB