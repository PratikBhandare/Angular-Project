import { Subscription } from "../Entities/subscription";
import { postRepo } from "../Repositories/post.repo";
import { sunscriptionRepo } from "../Repositories/subscription.repo";

class SubscriptionService {
    async addSubscription(subscription:any){
        console.log(subscription);
        

        let a = await sunscriptionRepo.query(`select * from subscriptionTable_Blog where author_id=${subscription.author} AND user_id=${subscription.user}`);
        console.log("Result:",a);
        if(a.length>0){
            console.log("alredy subscribed");
            
            return false
           
        }else{

            await sunscriptionRepo.save(subscription);
            return true
        }

    }

    
    

    
}

export = new SubscriptionService();
