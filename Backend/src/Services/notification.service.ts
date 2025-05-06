import { notificationRepo } from "../Repositories/notification.repo";


class NotificationService {

   async addNotification(notification:any){
    notificationRepo.save(notification);
   }

   async getNotification(){
    let r=await notificationRepo.find({relations:{
        user:true
    }});
    return r;
   }
}

export = new NotificationService();
