import { Request, Response } from "express";
import { IUser } from "../../interface.js";

export const registerUser = async (req:Request,res:Response)=>{

    try {
        const {userName,password,email,name }:IUser = req.body
        


    } catch (error) {
        
    }


}