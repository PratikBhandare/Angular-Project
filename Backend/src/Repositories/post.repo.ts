import { AppDataSOurce } from "../Configs/Database";
import { Post } from "../Entities/post";

export const postRepo= AppDataSOurce.getRepository(Post);