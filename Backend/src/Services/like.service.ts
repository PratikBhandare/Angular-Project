import { Like } from "../Entities/like";
import { likeRepo } from "../Repositories/like.repo.ts";
import { postRepo } from "../Repositories/post.repo";



class LikeService {

    async likePost(like:Partial<Like>){
        

        
        let post:any=await postRepo.find({
            relations:{
                likes:{user:true},
            },
            where:{id:like.post.id}
        })

        for(let i=0;i<post[0].likes.length;i++){
            console.log(post[0].likes[i].user.id);
            
            if(post[0].likes[i].user.id==like.user.id){
                console.log("liked userid:",post[0].likes[i].user.id)
                console.log("try to like userid:",like.user.id)
                console.log("aleredy Liked.");


                return "Alredy Liked..."
            }

            
        }
        await likeRepo.save(like);
        try{
            await postRepo.update({id:like.post.id},{likesCount:post[0].likes.length+1})
        }catch(err){
            return "Not Logged In..."
        }
        return "success"
       


    }

    

}

export = new LikeService();
