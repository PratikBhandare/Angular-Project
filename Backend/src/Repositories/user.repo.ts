import { AppDataSOurce } from "../Configs/Database";
import { User } from "../Entities/users";

export const userRepo= AppDataSOurce.getRepository(User);