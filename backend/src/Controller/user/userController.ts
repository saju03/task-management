import { Request, Response } from "express";
import { IUser } from "../../interface.js";
import { signUp } from "../../Services/userServices.js";

export const registerUser = async (req:Request,res:Response)=>{

    try {
        const {userName,password,email,name }:IUser = req.body

            const register = await signUp({userName,password,email,name})
     


    } catch (error) {
        
    }


}