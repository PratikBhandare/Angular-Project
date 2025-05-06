import { AppDataSOurce } from "../Configs/Database";
import { Notification } from "../Entities/notification";


export const notificationRepo= AppDataSOurce.getRepository(Notification);