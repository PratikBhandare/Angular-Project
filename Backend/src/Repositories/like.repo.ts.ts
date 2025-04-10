import { Like } from "../Entities/like";
import { AppDataSOurce } from "../Configs/Database";


export const likeRepo= AppDataSOurce.getRepository(Like);