import { Like } from "../Entities/like";
import likeService from "../Services/like.service";
import { Request,Response } from "express";

class LikeController {


    async likePost(req:Request,resp:Response){
        try{
            let like:Partial<Like> = req.body;
            // console.log("THis is Like Object backend",like);
            
            let result=await likeService.likePost(like);
            // resp.json({
            //     msg:"success"
            // })
            if(result=="Not Logged In..."){
                resp.json({
                    err:"Not Logged In..."
                })
            }else if(result=="Alredy Liked..."){
                
                resp.json({
                    err:"Alredy Liked..."
                })
            }else if(result==="success"){
                resp.json({
                    msg:"Success"
                })
            }
        }catch(err){
            console.log("Erorr....",err);

           
            
            
        }

    }

    
}

export = new LikeController();