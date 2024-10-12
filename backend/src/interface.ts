export interface IUser{
  
    name:string,
    userName:string,
    password:string,
    email:string
}

export interface createUser{
    toObject(): { userName: any; email: any; name: any; };
    name:string,
    userName:string,
    password:string,
    email:string
}



export interface createUserReturnType {
    status: number;
    user: IUser | null;
    message: string;
  }




  export type userHashDetails ={
    name?:string,
    type?:number,
    permission?:number

  }

  export interface TokenResponse {
    accessToken: string;
    refreshToken: string;
  }