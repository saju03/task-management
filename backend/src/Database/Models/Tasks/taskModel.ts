import mongoose, { model, Model, Schema } from "mongoose";
import { Task } from "../../../interface.js";
import { UserModel } from "../User/userModel.js";

const taskSchema = new Schema<Task>({
  taskId: {
    type: String,
    required: [true, "taskID required"],
    unique: true,
  },
  project: {
    type: String,
    required: [true, "project is required"],
  },
  title: {
    type: String,
    required: [true, "title is required"],
  },
  description: {
    type: String,
  },
  media: {
    type: [String],
  },
  parentTask: {
    type: String,
  },
  subTasks: {
    type: [String],
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
  lastUpdated: {
    type: Date,
    default: Date.now(),
  },
  dueDate: {
    type: Date,
    default: Date.now(),
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: UserModel,
  },

  // id:Number
  // description:String,
  // title:String,
  // images:Array,
  // videos:Array,
  // parentTask:String,
  // subTasks:Array,
  // status:String,
  // createdDate:Date,
  // lastUpdated:Date,
  // dueDate:Date,
});

export const TaskSchema: Model<Task> = model<Task>("task", taskSchema);
