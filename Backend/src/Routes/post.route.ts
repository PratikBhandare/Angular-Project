import express from "express";
import userController from "../Controllers/user.controller";
import { jwtAuth } from "../Middlewares/jwtAuth.middleware";
import postController from "../Controllers/post.controller";
import multer from "multer";
import { isAdmin } from "../Middlewares/admin.middleware";
import { postOperation } from "../Middlewares/postOperation.miidleware";
import { Admin } from "typeorm";
const storage=multer.diskStorage({
    destination:(req,resp,cb)=>{
        cb(null,'C:/Training/PrimeNg/BLogWebsite/Frontend/src/assets/Blog-images')
        // console.log(__dirname);
        
        
    },
    filename:(req,file,cb)=>{
        // console.log(req.file);
        
        console.log("file in multer",file);

        let postTitle=req.body;

        console.log("posttitle:",postTitle);
        
        

        // console.log("C:/Training/PrimeNg/BLogWebsite/Frontend/public/assets/Blog-images/"+file.originalname);
        // console.log(file.path);
        
        
        
        cb(null,file.originalname)
    }
})

const upload=multer({storage:storage})


const postRouter= express.Router();

postRouter.post("/create",jwtAuth,postController.creatPost);

postRouter.post("/uplodimg",upload.single('bimg'),postController.getImage);

postRouter.patch("/update/:id",postController.updatePost);

postRouter.delete("/delete/:id",postOperation,postController.deletPost);


postRouter.get("/activatepost/:id",isAdmin,postController.activatePost);

postRouter.get("/getActiveposts",postController.getActivePosts);

postRouter.get("/getDeActiveposts",isAdmin,postController.getDeActivePosts);

postRouter.get("/getposts",isAdmin,postController.getPosts);


postRouter.get("/getpostsbycategory/:category",postController.getPostsByCategory);

postRouter.get("/getpostbyid/:id",postController.getActivePostById);

postRouter.get("/getpost/likes/:id",postController.getPostsLikes);



export =postRouter;