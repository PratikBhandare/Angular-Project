import express from "express";
import userController from "../Controllers/user.controller";
import { jwtAuth } from "../Middlewares/jwtAuth.middleware";
import subscriptionController from "../Controllers/subscription.controller";


const subscriptionRouter= express.Router();

subscriptionRouter.post("/add",subscriptionController.addSubscription);
subscriptionRouter.post("/getallsubscriptions",subscriptionController.addSubscription);


export = subscriptionRouter;

