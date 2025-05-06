import { Like } from "../Entities/like";
import likeService from "../Services/like.service";
import { Request,Response } from "express";
import notificationService from "../Services/notification.service";
import { notContains } from "class-validator";
import { AppError } from "../Utils/apperror";

class NotificationController {

    async addNotification(req:Request,resp:Response){
        try{
            let notification = req.body;
        console.log(notification);
        

        notificationService.addNotification(notification)
        resp.json({
            msg:"success"
        })
        }catch(e){
            console.log("this is error Object:",e);
            
            // throw new AppError(E)
        }

    }

    async getNotification(req:Request,resp:Response){

        let r=await notificationService.getNotification()
        resp.status(200).send(r);

    }


    
    
}

export = new NotificationController();