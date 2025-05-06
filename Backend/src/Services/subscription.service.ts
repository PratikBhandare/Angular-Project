import { LockNotSupportedOnGivenDriverError } from "typeorm";
import { Subscription } from "../Entities/subscription";
import { postRepo } from "../Repositories/post.repo";
import { sunscriptionRepo } from "../Repositories/subscription.repo";
import { subscribe } from "../Routes/user.route";
import { AppError } from "../Utils/apperror";
import subscriptionRouter from "../Routes/subscription.route";

class SubscriptionService {
    async addSubscription(subscription:any){
        console.log(subscription);
        

        let a = await sunscriptionRepo.query(`select * from subscriptionTable_Blog where author_id=${subscription.author} AND user_id=${subscription.user} `);
        console.log("Result:",a);
        if(a.length>0){
            if(a[0].isActive==true){
                console.log("alredy subscribed");
            
                throw new AppError("Alredy subscribed",409)
            }
            else{
                console.log("else BLog",a);
                
                await sunscriptionRepo.update({id:a[0].id},{isActive:true})
            }
           
        }else{

            await sunscriptionRepo.save(subscription);
        }

    }

    async removeSubscription(subscription:any){
        console.log(subscription);
        

        let a = await sunscriptionRepo.query(`select * from subscriptionTable_Blog where author_id=${subscription.author} AND user_id=${subscription.user}`);
        console.log("Result:",a);
        if(a.length>0){
            console.log("alredy subscribed");
            
            throw new AppError("Alredy subscribed",409)
           
        }else{

            await sunscriptionRepo.save(subscription);
        }

    }

    
    

    
}

export = new SubscriptionService();
