
import { AppDataSOurce } from "../Configs/Database";
import { Comment } from "../Entities/comment";


export const commentRepo= AppDataSOurce.getRepository(Comment);