import { AppDataSOurce } from "../Configs/Database";
import { Subscription } from "../Entities/subscription";


export const sunscriptionRepo= AppDataSOurce.getRepository(Subscription);