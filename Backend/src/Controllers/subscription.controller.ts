import { NextFunction, Request, response, Response } from "express";

import subscriptionService from "../Services/subscription.service";




const secretKey: string = process.env.SECRET_KEY as string;

class SubscriptionController {

    async addSubscription(req: Request, resp: Response){
        let sub:any=req.body
        let r=await subscriptionService.addSubscription(sub);
        if(r===false){
            resp.json({
                err:"Alredy Subscribed...!"
            })

        }else{
            resp.json({
                msg:"success"
            })
        }
        
    }
    


}

export = new SubscriptionController();