import { NextFunction, Request, response, Response } from "express";

import subscriptionService from "../Services/subscription.service";
import { AppError } from "../Utils/apperror";




const secretKey: string = process.env.SECRET_KEY as string;

class SubscriptionController {

    async addSubscription(req: Request, resp: Response){
       try{
        let sub:any=req.body
        await subscriptionService.addSubscription(sub);
        resp.status(200).json({
            msg:"success"
        })
       }catch(e){
        // resp.send(e)
        // console.log("Error Object:",e.message);
        resp.status(e.statusCode).json({
            err:e.message
        })
        console.log(e.message,e.statusCode);
        
        // throw new AppError(e.error.message,e.error.statusCode)
      
       }
    
    }

    async removeSubscription(req: Request, resp: Response){
        try{
         let sub:any=req.body
         await subscriptionService.removeSubscription(sub);
         resp.status(200).json({
             msg:"success"
         })
        }catch(e){
         // resp.send(e)
         // console.log("Error Object:",e.message);
         resp.status(e.statusCode).json({
             err:e.message
         })
         console.log(e.message,e.statusCode);
         
         // throw new AppError(e.error.message,e.error.statusCode)
       
        }
     
     }
    


}

export = new SubscriptionController();