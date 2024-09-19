import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const initDB = async(): Promise<void> =>{
    try {
     await mongoose.connect("mongodb://localhost:27017/task_manager") 
    console.log('db connected');
    
} catch (error) {
    console.error(error)
}

}




export default initDB