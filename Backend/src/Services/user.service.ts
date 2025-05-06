


import { User } from "../Entities/users";
import { userRepo } from "../Repositories/user.repo";
import bcrypt from "bcrypt";
import { AppError } from "../Utils/apperror";

class UserService {
    async registerUser(user: Partial<User>) {

        let r=await userRepo.findOne({where:{
            email:user.email
        }})

        console.log("found:",r);
        

        if(r){

            throw new AppError("Email is Alredy Registered",409)
            

        }else{
             // Hash the password using the Promise version of bcrypt.hash
             const hashedPass = await bcrypt.hash(user.password, 10);
             user.password = hashedPass;
 
             // Save the user to the database
             await userRepo.save(user);
 
             // console.log("User registered:", user);
             // console.log("Hashed password:", hashedPass);
        }
           
        
    }

    async deletUser(id:number){
        await userRepo.update({id:id},{isActive:false});
    }

    async login(user: Partial<User>) {
        try {
            // Find the user by email
            const result = await userRepo.findOneBy({ email: user.email });

            if (!result) {
                console.log("User not found");
                return;
            }

            // Compare the password using bcrypt.compare (Promise-based)
            const isMatch = await bcrypt.compare(user.password, result.password);

            if (isMatch) {
                console.log("Password is Matched ...");
                return result; // Return the user data if the password matches
            } else {
                console.log("Password is incorrect");
                return null; // Return null or handle invalid login
            }
        } catch (err) {
            console.log("Error during login:", err);
        }
    }

    async getUsers(){
        
        
        let result=await userRepo.find({
            relations:{
                posts:true,
                // likes:true
            },
            where:{
                isActive:true
            }
        })
        console.log(result);
        

        return result;
    }


    async getUserData(id:number){
        console.log(id);
        
        let result=await userRepo.findOne({
            relations:{
                posts:true,
                likes:true,
                subscriptions:{
                    author:true,
                    user:true,
                },
                followers:{
                    user:true,
                },
                notifications:true
            },
            where:{id:id}
        })
        console.log(result);
        

        return result;
    }

    async getUserPosts(id:number){
        console.log(id);
        
        let result=await userRepo.findOne({
            relations:{
                posts:{author:true},
            },
            where:{id:id}
        })
        console.log(result);
        

        return result.posts;
    }

    async getUserSunscribedPosts(id:number){
        console.log(id);
        let result = await userRepo.findOne({
            where:{
                id:id,
            },
            relations:{
                subscriptions:{
                    author:true
                }
            }
        })
        return result.subscriptions;
    }

    async getUserSubscription(userId:number){
        let r=await userRepo.findOne({
            relations:{
                subscriptions:{author:true}
            },
            where:{
                id:userId
            }
        })

        console.log(r);
        

        return r
      

    }

    
}

export = new UserService();
