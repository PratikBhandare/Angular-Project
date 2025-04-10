
import { Request,Response } from "express";
import { Comment } from "../Entities/comment";
import commentService from "../Services/comment.service";

class CommentController {

    async addComment(req:Request,resp:Response){
        try{
            let comment:Comment=req.body;
            await commentService.addComment(comment);
            resp.json({
                msg:"success"
            })
        }catch(err){
            resp.json({
                err:err
            })
        }

    }

    async deletComment(req:Request,resp:Response){
        try{
            let commentId:number=Number(req.params.id);
            await commentService.deletComment(commentId);
            resp.json({
                msg:"success"
            })
        }catch(err){
            console.log(err);
            
            resp.json({
                err:err as String
            })
        }
    }

    async getCommentsByPostId(req:Request,resp:Response){
        
    }



    
}

export = new CommentController();