export interface IUser {
  name: string;
  userName: string;
  password: string;
  email: string;
}

export interface dbUserType {
  toObject(): { userName: any; email: any; name: any };
  name: string;
  userName: string;
  password: string;
  email: string;
}

export interface createUserReturnType {
  status: number;
  user: IUser | null;
  message: string;
}

export type userHashDetails = {
  name?: string;
  type?: number;
  permission?: number;
};
export interface userData {
  email?: string;
  userName?: string;
  password: string | null;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface getUserReturnType {
  user: {
    userName: string;
    email: string;
    name: string;
    password: string;
  };
  status: number;
}

export interface ErrorResponse {
  status: number;
  message: string;
}

export interface Task {
  taskId: string;
  project: string;
  title: string;
  description: string | null;
  media: Array<string> | null;
  parentTask: string | null;
  subTasks: Array<string> | null;
  createdDate: Date;
  lastUpdated: Date;
  dueDate: Date;
  createdBy:IUser
}
