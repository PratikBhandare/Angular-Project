import dotenv from "dotenv"
dotenv.config();
import cors from "cors";

import express, { json } from "express";

import { AppDataSOurce } from "./Configs/Database";
import userRouter from "./Routes/user.route";
import postRouter from "./Routes/post.route";
import likeRouter from "./Routes/like.route";
import commentRouter from "./Routes/comment.route";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser"
import { errorMiddleare } from "./Middlewares/error.middleware";
import subscriptionRouter from "./Routes/subscription.route";
import notificationRouter from "./Routes/notification.route";

const app = express()

app.use(cors(
    {
        origin: 'http://localhost:4200', // Allow only your frontend origin
        credentials: true, // Allow credentials (cookies, HTTP authentication)
      }
));
app.use(cookieParser())

app.use(errorMiddleare)


const PORT = process.env.PORT ;

app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/user",userRouter);
app.use("/post",postRouter);
app.use("/like",likeRouter);
app.use("/comment",commentRouter);
app.use("/subscription",subscriptionRouter);
app.use("/notification",notificationRouter);




app.listen(PORT,()=>{
    console.log(`Server is started on Port ${PORT}`);
})

AppDataSOurce.initialize()
.then(()=>{
    console.log("Connected to DataBase")
    
})
.catch((err)=>{
    console.log(err);
})