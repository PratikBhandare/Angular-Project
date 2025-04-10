import { Post } from "../Entities/post";
import { postRepo } from "../Repositories/post.repo";
import { userRepo } from "../Repositories/user.repo";
import { use } from "../Routes/user.route";
import { AppError } from "../Utils/apperror";

class PostService {

    async createPost(post:Partial<Post>){
        console.log("this is post",post);
        
        await postRepo.save(post);
    }

    async updatePost(post:Partial<Post>,postId:number){
        console.log("this is post",post);
        
        await postRepo.update({id:postId},post);
    }
    
    async deletPost(postId:number){

        await postRepo.delete({id:postId});


    }
    async activatePost(postId:number){

        await postRepo.update({id:postId},{isActive:true});

    }

    async deactivatePost(postId:number){

        await postRepo.update({id:postId},{isActive:false});
        
    }

    async getPosts(){
        
        let result=await postRepo.find({
            relations:{
                author:true,
                comments:true,
                likes:true
            },
        })
        console.log(result);
        return result;
    }

    async getPostsByCategory(category:category){
        console.log(category);
        
        
        let result=await postRepo.find({
            relations:{
                author:true,
                comments:true,
                likes:true
            },
            where:{
                category:category,isActive:true
            }
        })
        console.log(result);
        return result;
    }


    async getActivePosts(){
        
        let result=await postRepo.find({
            relations:{
                author:true,
                comments:true,
                likes:true
            },
            where:{isActive:true}
        })
        console.log(result);
        return result;
    }

    async getDeActivePosts(){
        
        let result=await postRepo.find({
            relations:{
                author:true,
                comments:true,
                likes:true
            },
            where:{isActive:false}
        })
        console.log(result);
        return result;
    }

    async getActivePostById(pid:number,uId:number){

        let user=await userRepo.findOne({where:{
            id:uId
        }})

        
        
        

        
        
        let result=await postRepo.find({
            relations:{
                author:true,
                comments:{author:true},
                likes:true
            },
            where:{id:pid}
        })

        if(result[0].isActive===false){
            if(user){
                if(user.role!="Admin"){
                    console.log("Error");
                    
                    throw new AppError("Forbiden...!",403)

                }
            }
        }

        // console.log("User in getactivepost",user);
        // if(user){
        //     if(result[0].isActive===false){
        //         if(user.role!=="Admin" ){
        //             console.log("Error");
                    
        //             throw new AppError("Forbiden...!",403)
        //         }

        // }
            
        // }



        
        console.log(result);
        return result;
    }

    async getDeactivePostById(pid:number){
        
        let result=await postRepo.find({
            relations:{
                author:true,
                comments:{author:true},
                likes:true
            },
            where:{id:pid,isActive:false}
        })

        
        // console.log(result);
        return result;
    }

    async updateViews(pid:number){

        let result=await postRepo.find({
            relations:{
                author:true,
                comments:{author:true},
                likes:true
            },
            where:{id:pid}
        })
        await postRepo.update({id:pid},{views:result[0].views+1})
    }

    async getPostsLikes(id:number){
        
        let result=await postRepo.find({
            relations:{
                author:true,
                likes:{user:true}
           
            },
            where:{id:id}
        })
        console.log(result);
        return result;
    }

}

export = new PostService();
