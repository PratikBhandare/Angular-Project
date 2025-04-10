import express from "express";

import likeController from "../Controllers/like.controller";
import commentController from "../Controllers/comment.controller";


const commentRouter= express.Router();

commentRouter.post("/add",commentController.addComment);
commentRouter.delete("/delete/:id",commentController.deletComment);
commentRouter.post("/add",commentController.addComment);


export =commentRouter;