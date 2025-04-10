import { Request,Response,NextFunction } from "express"
import { Long } from "typeorm"
import { AppError } from "../Utils/apperror";

export const errorMiddleare = (
    err:Error,
    req:Request,
    resp:Response,
    next:NextFunction
)=>{
    console.log("Error:",err.message);

    if(err instanceof AppError){
         resp.status(err.statusCode).json({
            status:"err",
            message:err.message,
        })
    }

    resp.status(500).json({
        status:"error",
        message:"Something Went Wrong!",
    })
    next();
    
}