import { DataSource } from "typeorm"
import { User } from "../Entities/users"
import { Post } from "../Entities/post"
import { Like } from "../Entities/like"
import { Comment } from "../Entities/comment"
import { Subscription } from "../Entities/subscription"
import { Notification } from "../Entities/notification"



export const AppDataSOurce = new DataSource({
    type:"mssql",
    username:process.env.DB_USERNAME,
    database:process.env.DB_DATABASE,
    host:process.env.DB_HOST,
    password:process.env.DB_PASSWORD,
    port:Number(process.env.DB_PORT),
    synchronize:true,
    logging:true,
    entities:[User,Post,Comment,Like,Subscription,Notification],
    options:{
        trustServerCertificate:true,
        encrypt:true
    }
})