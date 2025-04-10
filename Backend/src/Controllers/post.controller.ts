import { Post } from "../Entities/post";
import { post } from "../Routes/user.route";
import postService from "../Services/post.service";
import { Request, Response } from "express";

class PostController {
    file: any;

    constructor() {
        this.file = { filename: "" }; // Ensure the object is defined
        this.file.filename = 'example.txt';
        console.log("Name:", this.file.filename);
    }






    async creatPost(req: Request, resp: Response) {
        try {

            console.log("Body:", (req.body));
            // console.log("File:",req.file);
            // console.log("File in creat fun:",this.file);



            let post: Partial<Post> = req.body;
            console.log("Blog object:", post);

            await postService.createPost(post);
            resp.json({
                msg: "success",
            })
        } catch (err) {
            console.log(err);

            resp.json({
                err: "Faild"
            })
        }
    }




    getImage(req: Request, resp: Response) {

        resp.json({
            msg: "success get image",
        })

    }


    async updatePost(req: Request, resp: Response) {
        try {
            let postId =Number( req.params.id);
            console.log(postId);
            
            let post = req.body;
            delete post.authorId
            
            console.log("Inside controller",post);
            

            await postService.updatePost(post, postId)
            resp.json({
                msg: "sucees"
            })
        } catch (err) {
            console.log(err);
            resp.json({
                err: "Err"
            })

        }


    }

    async deletPost(req: Request, resp: Response){
        try{
            let postId =Number( req.params.id);
        await postService.deletPost(postId);
        resp.json({
            msg:"success"
        })
        }catch(err){
            console.log(err);
            resp.json({
                err:"err"
            })
            
        }
    }

    async activatePost(req: Request, resp: Response){
        try{
            let postId =Number( req.params.id);
            await postService.activatePost(postId);
        resp.json({
            msg:"success"
        })
        }catch(err){
            console.log(err);
            resp.json({
                err:"err"
            })
            
        }
    }

    async deactivatePost(req: Request, resp: Response){
        try{
            let postId =Number( req.params.id);
            await postService.deactivatePost(postId);
        resp.json({
            msg:"success"
        })
        }catch(err){
            console.log(err);
            resp.json({
                err:"err"
            })
            
        }
    }

    async getPosts(req: Request, resp: Response) {
        // let id=Number(req.params.id);

        let posts = await postService.getPosts()
        // console.log(userdata);

        resp.json({ posts: posts });
    }

    async getPostsByCategory(req: Request, resp: Response) {
        // let id=Number(req.params.id);

        let posts = await postService.getPostsByCategory(req.params.category as category)
        // console.log(userdata);

        resp.json({ posts: posts });
    }
    async getActivePosts(req: Request, resp: Response) {
        // let id=Number(req.params.id);

        let posts = await postService.getActivePosts()
        // console.log(userdata);

        resp.json({ posts: posts });
    }

    async getDeActivePosts(req: Request, resp: Response) {
        // let id=Number(req.params.id);

        let posts = await postService.getDeActivePosts()
        // console.log(userdata);

        resp.json({ posts: posts });
    }

    async getPostsLikes(req: Request, resp: Response) {
        let id = Number(req.params.id);

        let result = await postService.getPostsLikes(id)
        // console.log(userdata);

        resp.json({ Likes: result });
    }

    async getActivePostById(req: Request, resp: Response) {

       
        let userId;
            if(req.headers.user){

                console.log("log:",JSON.parse(req.headers.user! as string));
                let user=JSON.parse(req.headers.user as string)
                console.log("user is logged in ");
                userId = user.id
                
            }

        
        try {
            
            console.log("helooo");
            
        
            let postId = Number(req.params.id);
            
            console.log("queryin",postId,userId);
            
            let result = await postService.getActivePostById(postId,userId);
            if(result){
                postService.updateViews(result[0].id)
            }
            resp.json({
                post: result
            })
        
        } catch (err) {
            console.log(err);
            
            resp.json({
                err: err.message
            })
        }

    }

    async getDeactivePostById(req: Request, resp: Response) {
        try {
            let postId = Number(req.params.id);
            let result = await postService.getDeactivePostById(postId);
            if(result){
                postService.updateViews(result[0].id)
            }
            resp.json({
                post: result
            })
        } catch (err) {
            resp.json({
                err: ("Error:" + err)
            })
        }

    }




}

export = new PostController();