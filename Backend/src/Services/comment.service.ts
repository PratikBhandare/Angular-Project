import { Comment } from "../Entities/comment";
import { commentRepo } from "../Repositories/comment.repo.ts";

class CommentService {

    async addComment(comment:Comment){
        // console.log("This is Comment:",comment);
        
        await commentRepo.save(comment);

    }

    async deletComment(commentId:number){
        // console.log("This is Comment:",comment);
        
        await commentRepo.delete(commentId);

    }

    

    

}

export = new CommentService();
