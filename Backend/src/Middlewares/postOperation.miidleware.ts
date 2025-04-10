import { NextFunction,Request,Response } from "express";
import jwt from "jsonwebtoken";
const secretKey:string=process.env.SECRET_KEY as string;

export function postOperation(req:Request,resp:Response,next:NextFunction){
    let token = req.headers.authorization;
    console.log("THis is token",token);
    

    // console.log("Cookies:",req.cookies.token);
    

    if(token && token.startsWith("Bearer")){
        console.log(token);
        token=token.split(" ")[1]
        
        try{

            console.log("header in postmiddleware:",typeof req.headers.authorid);
            if(req.headers.authorid){

                // let author=JSON.parse()


                
            
            

            let result:any=jwt.verify(token!,secretKey);
            console.log("this is Admin Token verification",result);
            if(result){
                console.log("in result");
                
                if(result.User.id===Number(req.headers.authorid) || result.User.role==='Admin'){
                    next()
                    return;
                }else{
                    console.log("You dont have permission!!!");
                    
                }
            }
        }
            resp.json({
                err:"You dont have permission"
            })
            console.log("You cant access");
            
            return;
        
        }catch(err){
            console.log(err);
            console.log("Invalid permission");
            return;
        }

    }else{
        console.log("Not Valid user dont have token...");
        // resp.json({
        //     err:"Not logged in.."
        // })
    }
}