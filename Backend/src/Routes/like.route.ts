import express from "express";

import likeController from "../Controllers/like.controller";


const likeRouter= express.Router();

likeRouter.post("/post",likeController.likePost);


export =likeRouter;