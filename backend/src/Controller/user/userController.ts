import { Request, Response } from "express";
import { createUserReturnType, IUser, TokenResponse, userHashDetails } from "../../interface.js";
import {  signUp } from "../../Services/userServices.js";
import { getToken } from "../../Utils/tokenUtils.js";

export const registerUser = async (req:Request,res:Response)=>{

    try {
        const {userName,password,email,name }:IUser = req.body

            const register:createUserReturnType = await signUp({userName,password,email,name })
            if(register.status == 200 && register.user ){
                const tokenCredentials:userHashDetails = {name:register.user.name,type:1,permission:1}
                const token:TokenResponse = await getToken(tokenCredentials)
                res.cookie('auth',token.accessToken,{
                    maxAge:9*60*1000,
                    httpOnly: true, // Optional: restricts access to HTTP(S) requests only
                    secure: true,   // Optional: send cookie over HTTPS only (recommended for production)
                    sameSite: "strict" // Optional: controls cross-site request behavior
                })
                res.cookie('refresh',token.refreshToken,{
                    maxAge:15*60*1000,
                    httpOnly:true,
                    secure:true,
                    sameSite:true
                })
                res.json({status:true}).status(200)
            }
            res.json({message:'user registration failed'}).status(400)
     


    } catch (error) {
    
        res.json({message:'user registration failed'}).status(400)
     
    }


}