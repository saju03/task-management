import { Schema } from "mongoose";

const taskSchema = new Schema({
    taskId:{
        type:String,
        id:Number,
        description:String

    }
})