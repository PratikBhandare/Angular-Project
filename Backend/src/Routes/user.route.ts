import express from "express";
import userController from "../Controllers/user.controller";
import { jwtAuth } from "../Middlewares/jwtAuth.middleware";
import multer from "multer";
import path from "path"
import { isAdmin } from "../Middlewares/admin.middleware";

const storage=multer.diskStorage({
    destination:(req,resp,cb)=>{
        cb(null,'C:/Training/PrimeNg/BLogWebsite/Frontend/src/assets/profile-images')
        // console.log(__dirname);
        
        
    },
    filename:(req,file,cb)=>{
        // console.log(req.body);
        
        console.log("file in multer",file);

        console.log("C:/Training/PrimeNg/BLogWebsite/Frontend/public/assets/profile-images/"+file.originalname);
        
        
        cb(null,file.originalname)
    }
})

const upload=multer({storage:storage})


const userRouter= express.Router();

userRouter.post("/login",userController.login);
userRouter.post("/logincheck",userController.checkLogin);

userRouter.get("/logout",userController.logout);

userRouter.get("/getpass",jwtAuth,userController.getpass);

userRouter.post("/signUp",upload.single('pimg'),userController.registerUser);
userRouter.post("/uploadimg",upload.single('pimg'),userController.registerUser);


userRouter.get("/getUsers",userController.getUsers);

userRouter.delete("/deletuser/:id",jwtAuth,isAdmin,userController.deletUser);

userRouter.get("/getuserdata/:id",userController.getUserDaata);


userRouter.get("/getuserposts/:id",userController.getUserPosts);

userRouter.get("/getusersunscribedposts/:id",userController.getUserSunscribedPosts);

userRouter.get("/getusersubscriptions/:id",userController.getUserSubscriptions);


export =userRouter;