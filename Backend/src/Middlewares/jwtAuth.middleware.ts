import { NextFunction,Request,Response } from "express";
import jwt from "jsonwebtoken";
const secretKey:string=process.env.SECRET_KEY as string;

export function jwtAuth(req:Request,resp:Response,next:NextFunction){
    let token = req.headers.authorization;
    console.log("THis is token",token);
    

    // console.log("Cookies:",req.cookies.token);
    

    if(token && token.startsWith("Bearer")){
        console.log(token);
        token=token.split(" ")[1]
        
        try{
            let result=jwt.verify(token!,secretKey);
            console.log("this is Token verification",result);
            next();
        }catch(err){
            console.log(err);
            console.log("Invalid.user");
            return;
        }

    }
}